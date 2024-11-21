import { InputFO, InputSelectFO } from "../components/ui";
import { Heading } from "../components/heading";
import { DropZoneAvatar } from "../components/rhf";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../components/ui/scroll-area";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { label } from "framer-motion/m";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

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

export const CreatePage = () => {
    const [userData, setUserData] = useState({
        idType: { label: "Select an identification type", value: "select" },
        idNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthDate: "",
        gender: { label: "Select a gender", value: "select" },
        email: "",
        phone: "",
        photo: "",
    });

    const handleInputChange = (field: string, value: any) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("UserData before submission:", userData);

        try {
            const payload = {
                idType: userData.idType.label || "", // Asegura que idType sea un string
                idNumber: parseInt(userData.idNumber, 10) || 0, // Convierte a número o usa 0 si es inválido
                firstName: userData.firstName.trim() || "",
                middleName: userData.middleName?.trim() || undefined, // Elimina si está vacío
                lastName: userData.lastName.trim() || "",
                birthDate: new Date(userData.birthDate) || "", // Asegura que sea una fecha válida
                gender: userData.gender.label || "", // Asegura que gender sea un string
                email: userData.email.trim() || "",
                phone: userData.phone.trim() || "",
                photo: userData.photo || "",
            };

            // Valida que todos los campos requeridos tengan datos válidos
            if (!payload.idType || !payload.idNumber || !payload.firstName || !payload.lastName || !payload.birthDate || !payload.gender || !payload.email || !payload.phone) {
                toast.error("Uh Oh! Something went wrong!", {
                    description: "Please fill in all required fields.",
                });
                return;
            }

            const response = await axios.post("http://localhost:3000/api/create", payload);

            if (response.status === 201) {
                toast.success("User created successfully!", {
                    description: "The user was successfully created.",
                });
            }

            // Limpia los datos después de enviar
            setUserData({
                idType: { label: "Select an identification type", value: "select" },
                idNumber: "",
                firstName: "",
                middleName: "",
                lastName: "",
                birthDate: "",
                gender: { label: "Select a gender", value: "select" },
                email: "",
                phone: "",
                photo: "",
            });
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.error("Uh Oh! Something went wrong!", {
                    description: "The user identification already exists.",
                });
            } else {
                toast.error("Uh Oh! Something went wrong!", {
                    description: error.message,
                });
            }
        }
    };

    return (
        <>
            <ScrollArea className="w-full xl:h-max" type="auto">
                <form onSubmit={handleSubmit}>
                    <main className="gap-4 mt-8 md:gap-6 xl:container">
                        <div className="grid flex-1 gap-4">
                            <Heading
                                icon={<IoAddCircleSharp size={28} />}
                                title="Create User"
                                description="Create a new user by filling out the form below."
                            />
                            {/* Animación y renderizado condicional */}
                            <div className="relative">
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }} // Estado inicial: opacidad 0, desplazamiento hacia arriba
                                        animate={{ opacity: 1, y: 0 }} // Animación al entrar: opacidad 1, posición normal
                                        exit={{ opacity: 0, y: 20 }} // Animación al salir: opacidad 0, desplazamiento hacia abajo
                                        transition={{ duration: 0.5 }} // Duración de la animación
                                        className="grid gap-4 lg:grid-cols-[1fr_250px] xl:grid-cols-3 xl:gap-6 my-8 mb-0"
                                    >
                                        <div className="grid auto-rows-min col-span-full xl:col-span-1 gap-4 lg:gap-6 xl:sticky xl:top-7  xl:overflow-auto xl:h-[calc(80vh-1rem)]">

                                            <Card className="overflow-hidden border-0 bg-base-200 shadow-sm rounded-2xl">
                                                <CardContent>
                                                    <div className="flex flex-col p-5">
                                                        <div className="flex flex-col w-full items-center">
                                                            <div className="p-4">
                                                                <div className="p-4">
                                                                    <DropZoneAvatar
                                                                        nameZone="avatar"
                                                                        label="Upload Avatar"                           
                                                                        onChange={(files) => {
                                                                            if (files.length > 0) {
                                                                                handleInputChange("photo", files[0].preview); // Guardar la imagen en Base64
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter
                                                        className="flex flex-col items-center justify-center "
                                                    >
                                                        <p className="text-center mt-4 text-sm text-base-content/50">
                                                            Click the avatar or drop a image to update the user's photo.
                                                        </p>
                                                    </CardFooter>
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
                                                        Enter the general information of the user.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-5">
                                                        <InputSelectFO
                                                            classNameWrapper={'col-span-2 md:col-span-1 bg-base-200'}
                                                            placeholder={'Select an identification type'}
                                                            id="identificationType"
                                                            label="Identification Type"
                                                            options={optionsIdentification.value}
                                                            value={userData.idType}
                                                            onChange={(selected) => handleInputChange("idType", selected)} name={""} />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            classNameLabel="bg-base-200"
                                                            rounded="rounded-lg"
                                                            placeholder=""
                                                            id="identificationNumber"
                                                            label="Identification Number"
                                                            value={userData.idNumber}
                                                            onChange={(e) => handleInputChange("idNumber", e.target.value)} name={""} />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            classNameLabel="bg-base-200"
                                                            rounded="rounded-lg"
                                                            placeholder=""
                                                            id="firstName"
                                                            label="First Name"
                                                            value={userData.firstName}
                                                            onChange={(e) => handleInputChange("firstName", e.target.value)} name={""} />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            classNameLabel="bg-base-200"
                                                            rounded="rounded-lg"
                                                            placeholder=""
                                                            id="secondName"
                                                            label="Second Name"
                                                            value={userData.middleName}
                                                            onChange={(e) => handleInputChange("middleName", e.target.value)} name={""} />
                                                        <InputFO
                                                            className="col-span-2 bg-base-200"
                                                            classNameLabel="bg-base-200"
                                                            rounded="rounded-lg"
                                                            placeholder=""
                                                            id="surnames"
                                                            label="Last Name"
                                                            value={userData.lastName}
                                                            onChange={(e) => handleInputChange("lastName", e.target.value)} name={""} />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            classNameLabel="bg-base-200"
                                                            rounded="rounded-lg"
                                                            placeholder=""
                                                            id="dateOfBirth"
                                                            label="Date of Birth"
                                                            type="date"
                                                            value={userData.birthDate}
                                                            onChange={(e) => handleInputChange("birthDate", e.target.value)} name={""} />
                                                        <InputSelectFO
                                                            classNameWrapper={'col-span-2 md:col-span-1 bg-base-200'}
                                                            placeholder={'Select a gender'}
                                                            id="gender"
                                                            label="Gender"
                                                            options={genderOptions.value}
                                                            value={userData.gender}
                                                            onChange={(selected) => handleInputChange("gender", selected)} name={""} />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            classNameLabel="bg-base-200"
                                                            rounded="rounded-lg"
                                                            placeholder=""
                                                            id="email"
                                                            label="Email"
                                                            type="email"
                                                            value={userData.email}
                                                            onChange={(e) => handleInputChange("email", e.target.value)} name={""} />
                                                        <InputFO
                                                            className="col-span-2 md:col-span-1 bg-base-200"
                                                            classNameLabel="bg-base-200"
                                                            rounded="rounded-lg"
                                                            placeholder=""
                                                            id="phone"
                                                            label="Phone"
                                                            value={userData.phone}
                                                            onChange={(e) => handleInputChange("phone", e.target.value)} name={""} />
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <button
                                                        className="btn btn-primary flex w-full"
                                                        type="submit"
                                                    >
                                                        Create User
                                                    </button>
                                                </CardFooter>
                                            </Card>
                                        </div>

                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </main>
                </form>
            </ScrollArea >
        </>
    );
};
