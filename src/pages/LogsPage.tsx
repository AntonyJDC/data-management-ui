import { useState } from "react";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";
import { Helmet } from "react-helmet";
import { InputFO, InputSelectFO } from "../components/ui";
import { Heading } from "../components/heading";
import { ScrollArea } from "../components/ui/scroll-area";
import { IoClipboardSharp } from "react-icons/io5";
import { HiPlus, HiPencil, HiTrash, HiEye } from "react-icons/hi";
import { SlClose, SlDoc, SlMagnifierRemove, SlSocialDropbox } from 'react-icons/sl';
import { Icon } from "lucide-react";

interface Log {
    idNumber: string;
    action: string;
    timestamp: string;
    message: string;
}

// Función para mapear acciones a íconos
const getActionIcon = (action: string) => {
    switch (action) {
        case "create":
            return <HiPlus size={20} title="Create" />;
        case "update":
            return <HiPencil size={20} title="Update" />;
        case "delete":
            return <HiTrash size={20} title="Delete" />;
        case "read":
            return <HiEye size={20} title="Read" />;
        default:
            return action; // Retorna el texto si no hay ícono definido
    }
};

const options = {
    value: [
        { label: "All", value: "all" },
        { label: "Create", value: "create" },
        { label: "Update", value: "update" },
        { label: "Delete", value: "delete" },
        { label: "Read", value: "read" },
    ],
};

export const LogsPage = () => {
    const [selectedType, setSelectedType] = useState(options.value[0]);
    const [searchUserId, setSearchUserId] = useState("");
    const [date, setDate] = useState("");

    const [logs, setLogs] = useState<Log[]>([]); // Datos actuales para la página
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Función para obtener logs del backend
    const fetchLogs = async () => {
        setLoading(true);
        setError(false);
        setHasSearched(true);

        const params = {
            idNumber: searchUserId || undefined,
            action: selectedType.value !== "all" ? selectedType.value : undefined,
            date: date || undefined, // Usar fecha específica
        };

        try {
            const response = await axios.get("http://localhost:3000/api/logs", { params });
            setLogs(response.data.data); // Actualiza los datos
        } catch (err) {
            console.error("Error fetching logs:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Helmet para modificar el título de la página */}
            <Helmet>
                <title>Logs | Data Management</title>
            </Helmet>

            {/* Área de scroll principal */}
            <ScrollArea className="w-full xl:h-full" type="auto">
                <main className="gap-4 mt-8 md:gap-6 xl:container">
                    <div className="grid flex-1 gap-4">
                        {/* Encabezado de la página */}
                        <Heading
                            icon={<IoClipboardSharp size={28} />}
                            title="Logs"
                            description="View the logs of the system."
                        />

                        {/* Contenedor de filtros con grid */}
                        <div className="grid grid-cols-6 gap-y-4 gap-x-2 my-5">
                            {/* Filtro de selección */}
                            <InputSelectFO
                                className="col-span-2 bg-base-100"
                                placeholder="Select a type"
                                id="type"
                                label="Type"
                                options={options.value}
                                value={selectedType}
                                onChange={(newValue: unknown) =>
                                    setSelectedType(newValue as { label: string; value: string })
                                }
                                name="type"
                            />

                            {/* Campo de búsqueda de usuario */}
                            <InputFO
                                id="searchUserInput1"
                                type="text"
                                name="searchUserInput1"
                                label="Search User"
                                placeholder="Search User"
                                value={searchUserId}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setSearchUserId(e.target.value)
                                }
                                rounded="rounded-xl"
                                className="col-span-2 bg-base-100 z-10"
                                classNameLabel="bg-base-100"
                            />

                            {/* Campo de búsqueda por fecha */}
                            <InputFO
                                id="date"
                                name="date"
                                label="Date"
                                placeholder="Select Date"
                                value={date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setDate(e.target.value)
                                }
                                rounded="rounded-xl"
                                className="col-span-2 bg-base-100"
                                classNameLabel="bg-base-100"
                                type="date"
                            />

                            {/* Botón de búsqueda */}
                            <button
                                className="btn btn-outline rounded-xl col-span-1 btn-active border-base-content/50"
                                onClick={() => {
                                    fetchLogs();
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <HiOutlineSearch size={28} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Tabla para mostrar los datos */}
                    <table className="table-auto border-separate border border-dashed w-full mb-14 p-1.5 text-sm text-left rounded-xl">
                        <thead>
                            <tr className="text-primary-content text-center p-0 m-0">
                                <th className="bg-primary rounded-xl rounded-b-none">Action</th>
                                <th className="bg-primary rounded-xl rounded-b-none px-6 py-3">ID Number</th>
                                <th className="bg-primary rounded-xl rounded-b-none px-6 py-3">Timestamp</th>
                                <th className="bg-primary rounded-xl rounded-b-none px-6 py-3">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length > 0 ? (
                                logs.map((log, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                                            } hover:bg-base-300 text-center`}
                                    >
                                        <td className="px-8 py-3 flex items-center justify-center gap-2">
                                            {getActionIcon(log.action)} <span>{log.action}</span>
                                        </td>
                                        <td className="px-6 py-3">{log.idNumber}</td>
                                        <td className="px-6 py-3">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3">{log.message}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center px-4 py-3 text-base-content/50 bg-base-100"
                                    >
                                        {hasSearched && !loading && !error ? (
                                            <StatusMessage
                                                icon={SlClose}
                                                title="No logs found"
                                                message="No logs found with the selected filters."
                                            />
                                        ) : error ? (
                                            <StatusMessage
                                                icon={SlMagnifierRemove}
                                                title="Error fetching logs"
                                                message="An error occurred while fetching the logs."
                                            />
                                        ) : (
                                            <StatusMessage
                                                icon={SlDoc}
                                                title="Start by searching for logs"
                                                message="Use the filters above to search for logs."
                                            />
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </ScrollArea>
        </>
    );
};

const StatusMessage = ({ icon: Icon, title, message }: { icon: React.ComponentType<{ size: number }>, title: string, message: string }) => {
    return (
        <div className='flex flex-1 items-center p-20 justify-center rounded-lg border border-dashed shadow-sm h-full animate-in fade-in duration-500'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <Icon size={55} />
                <h3 className='text-2xl font-bold tracking-tight'>
                    {title}
                </h3>
                <p className='text-sm text-muted-foreground'>
                    {message}
                </p>
            </div>
        </div>
    );
};
