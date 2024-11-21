import { HiOutlineSearch } from "react-icons/hi";
import { InputFO, InputSelectFO } from "../components/ui";
import { Heading } from "../components/heading";
import { DropZoneAvatar } from "../components/rhf";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from 'sonner';
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const optionsIdentification = {
    value: [
        { label: "Tarjeta de identidad", value: "ti" },
        { label: "Cedula", value: "cc" },
    ],
};

const genderOptions = {
    value: [
        { label: "Masculino", value: "male" },
        { label: "Femenino", value: "female" },
        { label: "No binario", value: "nobinarie" },
        { label: "Prefiero no reportar", value: "preferNotToReport" },
    ],
};

export const ReadPage = () => {
    const [showCards, setShowCards] = useState(false);
    const [userData, setUserData] = useState({
        idType: { label: "", value: "" },
        idNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthDate: "",
        gender: { label: "", value: "" },
        email: "",
        phone: "",
        photo: "",
    });

    const handleSearch = async () => {
        const id = (document.getElementById("searchUserInput") as HTMLInputElement).value;
        if (!id) {
            toast.error('Uh Oh! Something went wrong!', {
                description: "please enter an id to search for a user",
            });
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/api/read/${id}`);
            const data = response.data.data;

            const idTypeValue =
                optionsIdentification.value.find(
                    (option) => option.label === data.idType
                ) || { label: "Desconocido", value: "unknown" };

            const genderValue =
                genderOptions.value.find(
                    (option) => option.label === data.gender
                ) || { label: "Desconocido", value: "unknown" };

            setUserData({
                idType: idTypeValue, // Mapeo del idType
                idNumber: data.idNumber,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                birthDate: data.birthDate.split("T")[0], // Formateo de la fecha
                gender: genderValue, // Mapeo del gender
                email: data.email,
                phone: data.phone,
                photo: data.photo,
            });
            toast.success("User found", {
                description: "The user was found successfully",
            });
            setShowCards(true); // Muestra las tarjetas después de cargar los datos
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                toast.error("User not found!", {
                    description: "The requested user does not exist in the database.",
                });
            } else {
                toast.error('Uh Oh! Something went wrong!', {
                    description: error.message,
                });
            }
        }
    }

    return (
        <>
            <ScrollArea className="w-full xl:h-max" type="auto">
                <main className="gap-4 mt-8 md:gap-6 xl:container">
                    <div className="grid flex-1 gap-4">
                        <Heading
                            icon={<HiOutlineSearch size={28} />}
                            title="Read User"
                            description="Search for a user with the search bar below to view their information."
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
                                onClick={handleSearch}
                                className="btn btn-outline rounded-xl btn-active rounded-l-none border-base-content/50 border-l-0"
                            >
                                <HiOutlineSearch size={28} />
                            </button>
                        </div>

                        <div className="relative">
                            <AnimatePresence>
                                {showCards && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className="grid gap-4 lg:grid-cols-[1fr_250px] xl:grid-cols-3 xl:gap-6 my-8 mb-0"
                                    >
                                        <div className="grid auto-rows-min col-span-full xl:col-span-1 gap-4 lg:gap-6 xl:sticky xl:top-7  xl:overflow-auto xl:h-[calc(80vh-1rem)]">
                                            <Card className="overflow-hidden border-0 bg-base-200 shadow-sm rounded-2xl">
                                                <CardContent>
                                                    <div className="flex flex-col p-5">
                                                        <div className="flex flex-col w-full items-center">
                                                            <div className="p-4">
                                                                <div className="p-4">
                                                                    {userData.photo ? (
                                                                        <img
                                                                            src={userData.photo}
                                                                            alt="User Avatar"
                                                                            className="w-60 h-60 rounded-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-44 h-44 flex items-center justify-center bg-base-300 rounded-full border-2 border-dashed">
                                                                            <span className="text-base-content/50">No Avatar</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div className="grid auto-rows-min gap-4 lg:col-span-2 lg:gap-6">
                                            <Card
                                                x-chunk="general-data"
                                                className="border-0 bg-base-200 shadow-uniform-sm rounded-2xl"
                                            >
                                                <CardHeader>
                                                    <CardTitle>General Data</CardTitle>
                                                    <CardDescription>
                                                        The following information is the general data of the user.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-5">
                                                        <InputSelectFO
                                                            classNameWrapper={"col-span-2 md:col-span-1 bg-base-200"}
                                                            id="identificationType"
                                                            label="Identification Type"
                                                            name="identificationType"
                                                            placeholder="Select an identification type"
                                                            options={optionsIdentification.value}
                                                            required
                                                            isDisabled
                                                            value={userData.idType}
                                                        />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            id="identificationNumber"
                                                            label="Identification Number"
                                                            name="identificationNumber"
                                                            type="text"
                                                            required
                                                            disabled
                                                            value={userData.idNumber}
                                                        />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            id="firstName"
                                                            label="First Name"
                                                            name="firstName"
                                                            type="text"
                                                            required
                                                            disabled
                                                            value={userData.firstName}
                                                        />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            id="secondName"
                                                            label="Second Name"
                                                            name="secondName"
                                                            type="text"
                                                            required
                                                            disabled
                                                            value={userData.middleName}
                                                        />
                                                        <InputFO
                                                            className="col-span-2 bg-base-200"
                                                            id="surnames"
                                                            label="Surnames"
                                                            name="surnames"
                                                            type="text"
                                                            required
                                                            disabled
                                                            value={userData.lastName}
                                                        />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            id="dateOfBirth"
                                                            label="Date of Birth"
                                                            name="dateOfBirth"
                                                            type="date"
                                                            required
                                                            disabled
                                                            value={userData.birthDate}
                                                        />
                                                        <InputSelectFO
                                                            id="gender"
                                                            name="gender"
                                                            classNameWrapper={"col-span-2 md:col-span-1 bg-base-200"}
                                                            label="Gender"
                                                            options={genderOptions.value}
                                                            required
                                                            isDisabled
                                                            value={userData.gender}
                                                        />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            id="email"
                                                            label="Email"
                                                            name="email"
                                                            type="email"
                                                            required
                                                            disabled
                                                            value={userData.email}
                                                        />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            id="phone"
                                                            label="Phone"
                                                            name="phone"
                                                            type="text"
                                                            required
                                                            disabled
                                                            value={userData.phone}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </main>
            </ScrollArea >
        </>
    );
};
