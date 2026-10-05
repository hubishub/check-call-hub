export type LoadStatus =
  | "dispatched"
  | "at_pickup"
  | "loaded"
  | "in_transit"
  | "at_delivery"
  | "delivered"
  | "exception";

export type RiskLevel = "low" | "watch" | "high" | "critical";

export type CheckCallStage =
  | "post_dispatch"
  | "pre_pickup"
  | "at_pickup"
  | "mid_transit"
  | "pre_delivery"
  | "delivered";

export type CheckCallType =
  | "scheduled"
  | "driver_initiated"
  | "broker_ask"
  | "exception"
  | "handoff";

export type PodStatus = "pending" | "received" | "attached" | "rejected";

export type EscalationKind =
  | "missed_eta"
  | "detention"
  | "hos_pressure"
  | "weather"
  | "equipment"
  | "broker_escalation";

export type EscalationStatus = "open" | "watching" | "resolved";

export interface Appointment {
  type: "pickup" | "delivery";
  facility: string;
  city: string;
  state: string;
  windowStart: string;
  windowEnd: string;
}

export interface CheckCall {
  id: string;
  loadId: string;
  driverName: string;
  type: CheckCallType;
  stage: CheckCallStage;
  at: string;
  location: string;
  etaVsAppointment: string;
  delayRisk: string;
  nextHourNeed: string;
  notes?: string;
  createdBy: string;
}

export interface Load {
  id: string;
  ref: string;
  status: LoadStatus;
  risk: RiskLevel;
  shipper: string;
  broker: string;
  originCity: string;
  originState: string;
  destCity: string;
  destState: string;
  miles: number;
  rate: number;
  commodity: string;
  weight: number;
  equipment: "53_dry_van";
  driverName: string;
  driverPhone: string;
  truckUnit: string;
  appointments: Appointment[];
  lastCheckCallId?: string;
  nextCheckDue?: string;
  notes: string;
}

export interface PodItem {
  id: string;
  loadId: string;
  loadRef: string;
  fileName: string;
  status: PodStatus;
  uploadedAt: string;
  notes: string;
}

export interface Escalation {
  id: string;
  loadId: string;
  loadRef: string;
  kind: EscalationKind;
  status: EscalationStatus;
  title: string;
  detail: string;
  openedAt: string;
  owner: string;
  severity: RiskLevel;
}

export interface HandoffNote {
  id: string;
  shift: string;
  author: string;
  createdAt: string;
  body: string;
  loadRefs: string[];
  openRisks: string[];
}
