"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CheckCall,
  CheckCallStage,
  CheckCallType,
  Escalation,
  EscalationStatus,
  HandoffNote,
  PodItem,
  PodStatus,
  RiskLevel,
  Load,
} from "@/lib/types";
import { MOCK_LOADS } from "@/data/mock-loads";
import { MOCK_CHECK_CALLS } from "@/data/mock-check-calls";
import { MOCK_PODS } from "@/data/mock-pods";
import { MOCK_ESCALATIONS } from "@/data/mock-escalations";
import { MOCK_HANDOFFS } from "@/data/mock-handoffs";

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

interface HubState {
  loads: Load[];
  checkCalls: CheckCall[];
  pods: PodItem[];
  escalations: Escalation[];
  handoffs: HandoffNote[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addCheckCall: (input: {
    loadId: string;
    driverName: string;
    type: CheckCallType;
    stage: CheckCallStage;
    location: string;
    etaVsAppointment: string;
    delayRisk: string;
    nextHourNeed: string;
    notes?: string;
  }) => void;
  updatePodStatus: (id: string, status: PodStatus) => void;
  updateEscalationStatus: (id: string, status: EscalationStatus) => void;
  addHandoff: (input: {
    shift: string;
    author: string;
    body: string;
    loadRefs: string[];
    openRisks: string[];
  }) => void;
  setLoadRisk: (id: string, risk: RiskLevel) => void;
  resetDemo: () => void;
}

export const useHubStore = create<HubState>()(
  persist(
    (set, get) => ({
      loads: MOCK_LOADS,
      checkCalls: MOCK_CHECK_CALLS,
      pods: MOCK_PODS,
      escalations: MOCK_ESCALATIONS,
      handoffs: MOCK_HANDOFFS,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      addCheckCall: (input) => {
        const id = uid("cc");
        const at = new Date().toISOString();
        const call: CheckCall = {
          id,
          loadId: input.loadId,
          driverName: input.driverName,
          type: input.type,
          stage: input.stage,
          at,
          location: input.location,
          etaVsAppointment: input.etaVsAppointment,
          delayRisk: input.delayRisk,
          nextHourNeed: input.nextHourNeed,
          notes: input.notes,
          createdBy: "Demo desk",
        };
        set({
          checkCalls: [call, ...get().checkCalls],
          loads: get().loads.map((l) =>
            l.id === input.loadId ? { ...l, lastCheckCallId: id } : l
          ),
        });
      },
      updatePodStatus: (id, status) => {
        set({
          pods: get().pods.map((p) => (p.id === id ? { ...p, status } : p)),
        });
      },
      updateEscalationStatus: (id, status) => {
        set({
          escalations: get().escalations.map((e) =>
            e.id === id ? { ...e, status } : e
          ),
        });
      },
      addHandoff: (input) => {
        const note: HandoffNote = {
          id: uid("ho"),
          shift: input.shift,
          author: input.author,
          createdAt: new Date().toISOString(),
          body: input.body,
          loadRefs: input.loadRefs,
          openRisks: input.openRisks,
        };
        set({ handoffs: [note, ...get().handoffs] });
      },
      setLoadRisk: (id, risk) => {
        set({
          loads: get().loads.map((l) => (l.id === id ? { ...l, risk } : l)),
        });
      },
      resetDemo: () => {
        set({
          loads: MOCK_LOADS,
          checkCalls: MOCK_CHECK_CALLS,
          pods: MOCK_PODS,
          escalations: MOCK_ESCALATIONS,
          handoffs: MOCK_HANDOFFS,
        });
      },
    }),
    {
      name: "check-call-hub-demo-v1",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
