import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle } from "@/components/ui/alert";
import DeleteCanalDialog from "./partials/DeleteCanalDialog";
import { Button } from "@/components/ui/button";
import { Plus, Eye, PencilSimple, Trash } from "@phosphor-icons/react";
import { useState } from "react";
type Canal = {
    id: number;
    name: string;
    clients: number;
};

interface IndexProps extends InertiaProps {
    canals: Canal[];
}

export default function Index() {
    const canals = usePage<IndexProps>().props.canals;

    // Delete logic
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCanal, setSelectedCanal] = useState<Canal | null>(null);

    const handleDelete = () => {
        if (selectedCanal) {
            router.delete(`/canals/${selectedCanal.id}`, {
                onSuccess: () => setDeleteDialogOpen(false),
            });
        }
    };

    const openDeleteDialog = (canal: Canal) => {
        setSelectedCanal(canal);
        setDeleteDialogOpen(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Canals
                </h2>
            }
        >
            <Head title="Canals" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-semibold text-gray-500">
                                    List of canals
                                </p>
                                <Button
                                    className="m-2"
                                    onClick={() => router.get("/canals/create")}
                                >
                                    <Plus />
                                    Create
                                </Button>
                            </div>
                            {canals.length === 0 ? (
                                <Alert className="mb-4">
                                    <AlertTitle>No canals available</AlertTitle>
                                    There are no canals to display at the
                                    moment.
                                </Alert>
                            ) : (
                                <Table>
                                    <TableHeader className="bg-gray-100">
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                ID
                                            </TableHead>
                                            <TableHead>NAME OF CANAL</TableHead>
                                            <TableHead>CLIENTS</TableHead>
                                            <TableHead className="w-[200px]">
                                                ACTIONS
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {canals.map((canal) => (
                                            <TableRow key={canal.id}>
                                                <TableCell className="font-medium">
                                                    {canal.id}
                                                </TableCell>
                                                <TableCell>
                                                    {canal.name}
                                                </TableCell>
                                                <TableCell>
                                                    {canal.clients}
                                                </TableCell>
                                                <TableCell className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="mr-2"
                                                        onClick={() =>
                                                            router.get(
                                                                `/canals/${canal.id}`
                                                            )
                                                        }
                                                    >
                                                        <Eye />
                                                        Show
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="mr-2"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/canals/${canal.id}/edit`
                                                            )
                                                        }
                                                    >
                                                        <PencilSimple />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="text-red-500 hover:bg-red-400 hover:text-gray-100"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openDeleteDialog(
                                                                canal
                                                            )
                                                        }
                                                    >
                                                        <Trash />
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DeleteCanalDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                canalName={selectedCanal?.name || ""}
                onDelete={handleDelete}
            />
        </AuthenticatedLayout>
    );
}
