import React from "react";
import { Entry, EntryType } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthCareEntryDetails from "./OccupationalHealthCareEntryDetails";
import { assertNever } from "../utils";

const EntryDetails: React.FC<({ entry: Entry })> = ({ entry }) => {

  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} />;
    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthCareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  } 
};

export default EntryDetails;