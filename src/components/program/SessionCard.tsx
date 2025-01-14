"use client";

import type { Session } from "../../types/program.ts";
import { dayAndTimeFormatWithMonth } from "../../utils/dateformat.ts";
import { useEffect, useState } from "react";

interface Props {
    session: Session;
    clicked: boolean;
    setClicked: (prev: (prev: boolean) => boolean) => void;
}

export const SessionCard = ({ session, clicked, setClicked }: Props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoritesArray = JSON.parse(
            localStorage.getItem("favorites") || "[]",
        );
        setIsFavorite(favoritesArray.includes(session.id));
    }, [session.id, clicked]);

    const handleFavoriteClick = () => {
        const favoritesArray = JSON.parse(
            localStorage.getItem("favorites") || "[]",
        );
        if (favoritesArray.includes(session.id)) {
            localStorage.setItem(
                "favorites",
                JSON.stringify(
                    favoritesArray.filter(
                        (favorite: string) => favorite !== session.id,
                    ),
                ),
            );
        } else {
            localStorage.setItem(
                "favorites",
                JSON.stringify([...favoritesArray, session.id]),
            );
        }
        setClicked((prev) => !prev);
    };
    return (
        <div className="flex justify-between bg-white relative p-3 border-black border-2 rounded-xl hover:scale-105 transition ease-in-out delay-150 duration-200">
            <a
                href={`/program/${session.id}`}
                className="no-underline text-inherit"
            >
                {session.room && session.startTime && (
                    <div className="flex justify-between pb-1 md:pb-2">
                        <p className="my-0 md:my-1 text-sm md:text-base">
                            {session.room} -{" "}
                            {dayAndTimeFormatWithMonth.format(
                                new Date(session.startTime),
                            )}{" "}
                            - {session.format} {session.video ? '🎬' : ''}
                        </p>
                    </div>
                )}

                <p className="my-0 md:my-1 text-base md:text-lg font-bold">
                    {session.title} ({session.language})
                </p>

                <div className="text-sm md:text-base">
                    {session.speakers.map((speaker) => (
                        <p className="m-0" key={speaker.name}>
                            {speaker.name}
                        </p>
                    ))}
                </div>
                <p className="text-lg text-end absolute bottom-0 right-1">
                    {session.length} min
                </p>
            </a>
            <button
                className="text-4xl hover:opacity-60 self-baseline"
                data-session-id={`${session.id}`}
                title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                onClick={handleFavoriteClick}
            >
                {isFavorite ? "★" : "☆"}
            </button>
        </div>
    );
};
