import type { Session } from "../../types/program.ts";
import { useState } from "react";
import {Filter, type FilterType} from "../filter/Filter.tsx";
import {Program} from "./Program.tsx";

interface Props {
    timeSlots: string[];
    sessions: Record<string, Session[]>;
}

export const FilteredProgram = ({ timeSlots, sessions }: Props) => {
    const [filter, setFilter] = useState<FilterType>("FULL_PROGRAM");



    return (
        <div className="flex flex-col gap-8">
            <Filter filter={filter} onChange={setFilter} />
            <Program timeSlots={timeSlots} sessions={sessions} filter={filter}/>
        </div>
    );
};
