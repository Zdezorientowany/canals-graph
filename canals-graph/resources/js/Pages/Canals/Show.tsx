import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { PencilSimple, Trash, ArrowLeft } from "@phosphor-icons/react";
import DeleteCanalDialog from "./partials/DeleteCanalDialog";
import { useState } from "react";

type Canal = {
    id: number;
    name: string;
    clients: number;
};

interface ShowProps extends InertiaProps {
    canal: Canal;
}

export default function Show() {
    const canal = usePage<ShowProps>().props.canal;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        router.delete(`/canals/${canal.id}`, {
            onSuccess: () => router.visit("/canals"),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="flex justify-between text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <p className="flex items-center">
                        Canals:
                        <span className="ml-2 text-gray-400">{canal.name}</span>
                    </p>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() =>
                                router.visit(`/canals/${canal.id}/edit`)
                            }
                        >
                            <PencilSimple size={20} className="mr-1" />
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            <Trash size={20} className="mr-1" />
                            Delete
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => router.visit("/canals")}
                        >
                            <ArrowLeft size={20} className="mr-1" />
                            Back
                        </Button>
                    </div>
                </h2>
            }
        >
            <Head title={`Canal: ${canal.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4">
                                <p>
                                    <strong>ID:</strong> {canal.id}
                                </p>
                                <p>
                                    <strong>Name:</strong> {canal.name}
                                </p>
                                <p>
                                    <strong>Clients:</strong> {canal.clients}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteCanalDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                canalName={canal.name}
                onDelete={handleDelete}
            />
        </AuthenticatedLayout>
    );
}
