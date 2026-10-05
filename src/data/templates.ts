export type Template = {
  id: string;
  category: "call_script" | "broker_sms" | "broker_email";
  title: string;
  body: string;
};

export const templates: Template[] = [
  {
    id: "t1",
    category: "call_script",
    title: "Standard mid-transit check-call",
    body: `Hi {driver}, quick check-call on {load_ref}.

1) Where are you right now (city or mile marker)?
2) Still projecting on-time for {appointment}? If not, what's the realistic ETA?
3) Any delay risk — traffic, weather, equipment, shipper/receiver?
4) What do you need from me in the next hour?

Thanks — I'm logging this and I'll text you if anything changes on the broker side.`,
  },
  {
    id: "t2",
    category: "call_script",
    title: "Pre-delivery / tight window",
    body: `Hi {driver}, pre-delivery check on {load_ref} into {receiver}.

Confirm: current location, ETA vs {window}, HOS drive/on-duty left, and any lumper or gate issues you already know about.

If we're going to miss, tell me now so I can move the appointment — don't wait for the gate.`,
  },
  {
    id: "t3",
    category: "broker_sms",
    title: "ETA revision (SMS)",
    body: `{load_ref} update: driver at {location}. Revised ETA {new_eta} vs appt {window}. Cause: {cause}. Request: confirm window still OK or advise. Next update by {next_update}.`,
  },
  {
    id: "t4",
    category: "broker_sms",
    title: "Detention start (SMS)",
    body: `{load_ref}: detention clock started {time} at {facility}. Shipper delay ~{minutes} min. Please confirm detention approval / updated delivery flexibility. Will update when rolling.`,
  },
  {
    id: "t5",
    category: "broker_email",
    title: "Missed-window risk (email)",
    body: `Subject: {load_ref} — appointment risk / need decision

Hi {broker_name},

Load {load_ref} ({origin} → {dest}) is at risk for the {window} window.

• Location: {location}
• Revised ETA: {new_eta}
• Cause: {cause}
• Driver HOS: {hos_summary}

Preferred option: {option_a}
Fallback: {option_b}

Please confirm how you'd like us to proceed. I will update again by {next_update}.

Thanks,
{dispatcher_name}`,
  },
  {
    id: "t6",
    category: "broker_email",
    title: "Re-power request (email)",
    body: `Subject: {load_ref} — re-power decision needed by {deadline}

Hi {broker_name},

Equipment / HOS issue on {load_ref} may prevent legal on-time delivery.

• Issue: {issue}
• Current location: {location}
• Appointment: {window}
• Decision needed by: {deadline}

We can (A) repair and continue if ETA holds, or (B) re-power from {relay_city}. Please advise preferred path.

{dispatcher_name}`,
  },
];
