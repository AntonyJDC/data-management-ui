import { HiOutlineSearch } from "react-icons/hi";
import { InputFO, InputSelectFO } from "../components/ui";
import { Heading } from "../components/heading";
import { DropZoneAvatar } from "../components/rhf";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../components/ui/scroll-area";
import { IoCreateSharp } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { iconSvgWarning, templateWarning } from "../components/ModalTemplate";

let id: string;

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

export const UpdatePage = () => {
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

    const handleInputChange = (field: string, value: any) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSearch = async () => {
        id = (document.getElementById("searchUserInput") as HTMLInputElement).value;
        if (!id) {
            toast.error('Uh Oh! Something went wrong!', {
                description: "please enter an id to search for a user",
            });
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/api/read/${id}`);
            if (response.status === 404) {
                toast.error("User not found.");
                return;
            }
            const data = response.data.data;

            const idTypeValue =
                optionsIdentification.value.find((option) => option.label === data.idType) || {
                    label: "Desconocido",
                    value: "unknown",
                };

            const genderValue =
                genderOptions.value.find((option) => option.label === data.gender) || {
                    label: "Desconocido",
                    value: "unknown",
                };

            setUserData({
                idType: idTypeValue,
                idNumber: data.idNumber,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                birthDate: data.birthDate.split("T")[0],
                gender: genderValue,
                email: data.email,
                phone: data.phone,
                photo: data.photo,
            });
            setShowCards(true);
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
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({
            buttonsStyling: false,
            iconHtml: iconSvgWarning,
            title: 'Confirmation Required',
            text: 'Are you sure you want to update this user?',
            customClass: templateWarning,
            showCancelButton: true,
            confirmButtonText: 'Yes, update it',
            cancelButtonText: 'No, keep it',
            reverseButtons: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const payload: any = {
                        idType: userData.idType.label,
                        idNumber: userData.idNumber,
                        firstName: userData.firstName,
                        middleName: userData.middleName,
                        lastName: userData.lastName,
                        birthDate: userData.birthDate,
                        gender: userData.gender.label,
                        email: userData.email,
                        phone: userData.phone,
                        photo: userData.photo,
                    };

                    // Incluir `newIdNumber` solo si ha cambiado
                    if (id !== userData.idNumber) {
                        payload.newIdNumber = userData.idNumber;
                    }

                    const response = await axios.put(`http://localhost:3004/api/update/${id}`, payload);

                    if (response.status === 200) {
                        toast.success('User updated successfully!', {
                            description: 'The user information has been updated successfully.',
                        });
                        setShowCards(false); // Ocultar los datos después de actualizar
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 409) {
                        toast.error('Duplicate ID!', {
                            description: 'The identification number provided exists for another user.',
                        });
                    } else {
                        toast.error('Something went wrong!', {
                            description: error.message,
                        });
                    }
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                toast.info('Update canceled', {
                    icon: '😊',
                });
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Update | Data Management</title>
            </Helmet>
            <ScrollArea className="w-full xl:h-max" type="auto">
                <form onSubmit={handleSubmit}>
                    <main className="gap-4 mt-8 md:gap-6 xl:container">
                        <div className="grid flex-1 gap-4">
                            <Heading
                                icon={<IoCreateSharp size={28} />}
                                title="Update User"
                                description="Update user information by searching for a user and modifying their details."
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
                                <a
                                    onClick={handleSearch}
                                    className="btn btn-outline rounded-xl btn-active rounded-l-none border-base-content/50 border-l-0"
                                >
                                    <HiOutlineSearch size={28} />
                                </a>
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
                                            <div className="grid auto-rows-min col-span-full xl:col-span-1 gap-4 lg:gap-6 xl:sticky xl:top-7 xl:overflow-auto">
                                                <Card className="overflow-hidden border-0 bg-base-200 shadow-sm rounded-2xl">
                                                    <CardContent>
                                                        <div className="flex flex-col p-20 items-center relative">
                                                            {/* Imagen de Avatar */}
                                                            <div className="relative w-44 h-44">
                                                                {userData.photo ? (
                                                                    <img
                                                                        src={userData.photo}
                                                                        alt="User Avatar"
                                                                        className="w-44 h-44 rounded-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-44 h-44 flex items-center justify-center bg-base-300 rounded-full">
                                                                        <span className="text-base-content/50">No Avatar</span>
                                                                    </div>
                                                                )}

                                                                {/* DropZoneAvatar superpuesto */}
                                                                <div className="absolute inset-y-[90px] flex items-center rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                                                    <DropZoneAvatar
                                                                        nameZone="avatar"
                                                                        label="Upload Avatar"
                                                                        onChange={(files) => {
                                                                            if (files.length > 0) {
                                                                                handleInputChange("photo", files[0].preview); // Actualiza la imagen en el estado
                                                                            }
                                                                        }}
                                                                    />
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
                                                            Update the general information of the user.
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-5">
                                                            <InputSelectFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                id="identificationType"
                                                                label="Identification Type"
                                                                placeholder=""
                                                                options={optionsIdentification.value}
                                                                value={userData.idType}
                                                                onChange={(selected) => handleInputChange("idType", selected)} name={""} />
                                                            <InputFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                classNameLabel="bg-base-200"
                                                                id="identificationNumber"
                                                                label="Identification Number"
                                                                placeholder=""
                                                                value={userData.idNumber}
                                                                onChange={(e) => handleInputChange("idNumber", e.target.value)} name={""} />
                                                            <InputFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                classNameLabel="bg-base-200"
                                                                id="firstName"
                                                                label="First Name"
                                                                placeholder=""
                                                                value={userData.firstName}
                                                                onChange={(e) => handleInputChange("firstName", e.target.value)} name={""} />
                                                            <InputFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                classNameLabel="bg-base-200"
                                                                id="secondName"
                                                                label="Second Name"
                                                                placeholder=""
                                                                value={userData.middleName}
                                                                onChange={(e) => handleInputChange("middleName", e.target.value)} name={""} />
                                                            <InputFO
                                                                className="col-span-2 bg-base-200"
                                                                classNameLabel="bg-base-200"
                                                                id="surnames"
                                                                label="Last Name"
                                                                placeholder=""
                                                                value={userData.lastName}
                                                                onChange={(e) => handleInputChange("lastName", e.target.value)} name={""} />
                                                            <InputFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                classNameLabel="bg-base-200"
                                                                id="dateOfBirth"
                                                                label="Date of Birth"
                                                                type="date"
                                                                value={userData.birthDate}
                                                                onChange={(e) => handleInputChange("birthDate", e.target.value)} name={""} />
                                                            <InputSelectFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                id="gender"
                                                                label="Gender"
                                                                placeholder=""
                                                                options={genderOptions.value}
                                                                value={userData.gender}
                                                                onChange={(selected) => handleInputChange("gender", selected)} name={""} />
                                                            <InputFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                classNameLabel="bg-base-200"
                                                                id="email"
                                                                label="Email"
                                                                placeholder=""
                                                                type="email"
                                                                value={userData.email}
                                                                onChange={(e) => handleInputChange("email", e.target.value)} name={""} />
                                                            <InputFO
                                                                className="col-span-2 md:col-span-1 bg-base-200"
                                                                classNameLabel="bg-base-200"
                                                                id="phone"
                                                                label="Phone"
                                                                placeholder=""
                                                                value={userData.phone}
                                                                onChange={(e) => handleInputChange("phone", e.target.value)} name={""} />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <button
                                                    className="btn btn-primary flex"
                                                    type="submit"
                                                >
                                                    Update User
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </main>
                </form>
            </ScrollArea>
        </>
    );
};