import { HiOutlineSearch } from "react-icons/hi";
import { Helmet } from "react-helmet";
import { InputFO } from "../components/ui";
import { Heading } from "../components/heading";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from 'sonner';
import axios from "axios";
import { IoClipboardSharp } from "react-icons/io5";


export const LogsPage = () => {

    return (
        <>
            <Helmet>
                <title>Logs | Data Management</title>
            </Helmet>
            <ScrollArea className="w-full xl:h-max" type="auto">
                <main className="gap-4 mt-8 md:gap-6 xl:container">
                    <div className="grid flex-1 gap-4">
                        <Heading
                            icon={<IoClipboardSharp size={28} />}
                            title="Logs"
                            description="View the logs of the system."
                        />
                        <div className="w-full flex">
                            <InputFO
                                id="searchUserInput"
                                type="text"
                                name="searchUserInput"
                                label="Search User"
                                placeholder="Search User"
                                rounded="rounded-xl rounded-r-none"
                                className="bg-base-100"
                                classNameLabel="bg-base-100"
                            />
                            <button

                                className="btn btn-outline rounded-xl btn-active rounded-l-none border-base-content/50 border-l-0"
                            >
                                <HiOutlineSearch size={28} />
                            </button>
                        </div>
                    </div>
                </main>
            </ScrollArea >
        </>
    );
};
