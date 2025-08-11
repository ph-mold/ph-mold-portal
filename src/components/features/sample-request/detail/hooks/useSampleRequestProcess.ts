import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ISampleRequest,
  getCompletedStatuses,
} from "../../../../../lib/types/sample-request";
import { ProcessNode } from "@/components/features/sample-request/detail";
import { PROCESS_NODE_VALUES } from "@/components/features/sample-request/detail/constants";

export function useSampleRequestProcess(request: ISampleRequest | undefined) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 노드 파라미터 읽기
  const nodeFromUrl = searchParams.get("n") as ProcessNode;

  // 완료된 단계들을 서버 status에서 계산
  const getCompletedSteps = (request: ISampleRequest): ProcessNode[] => {
    return getCompletedStatuses(request.status);
  };

  // 완료된 단계 다음 노드를 찾는 함수
  const getNextNode = (completedSteps: ProcessNode[]): ProcessNode => {
    // 완료된 단계가 비어있으면 첫 번째 노드(reception)로 이동
    if (completedSteps.length === 0) {
      return "reception";
    }

    const allNodes = PROCESS_NODE_VALUES;
    const lastCompletedIndex = Math.max(
      ...completedSteps.map((step) => allNodes.indexOf(step))
    );
    const nextIndex = lastCompletedIndex + 1;

    // 마지막 단계가 완료된 경우 마지막 단계를 반환
    if (nextIndex >= allNodes.length) {
      return allNodes[allNodes.length - 1];
    }

    return allNodes[nextIndex];
  };

  // request가 로드되면 완료된 단계와 다음 노드 계산
  const completedSteps = request ? getCompletedSteps(request) : [];
  const nextNode = getNextNode(completedSteps);

  // URL 쿼리가 없을 때 다음 노드로 자동 이동
  const [currentNode, setCurrentNode] = useState<ProcessNode>(() => {
    if (
      nodeFromUrl &&
      PROCESS_NODE_VALUES.includes(nodeFromUrl as ProcessNode)
    ) {
      return nodeFromUrl;
    }
    // URL 쿼리가 없으면 완료된 단계 다음 노드로 이동
    return nextNode;
  });

  // 노드 변경 시 URL 업데이트
  const handleNodeChange = (node: ProcessNode) => {
    setCurrentNode(node);
    setSearchParams({ n: node });
  };

  // URL 파라미터 변경 감지 및 request 상태 변경 시 자동 이동
  useEffect(() => {
    const nodeFromUrl = searchParams.get("n") as ProcessNode;
    if (
      nodeFromUrl &&
      PROCESS_NODE_VALUES.includes(nodeFromUrl as ProcessNode)
    ) {
      setCurrentNode(nodeFromUrl);
    } else if (!nodeFromUrl && request) {
      // URL 쿼리가 없고 request가 로드되면 완료된 단계 다음 노드로 이동
      const newNextNode = getNextNode(getCompletedSteps(request));
      setCurrentNode(newNextNode);
      // setSearchParams 제거 - URL을 변경하지 않음
    }
  }, [searchParams, request]);

  return {
    currentNode,
    completedSteps,
    handleNodeChange,
  };
}
