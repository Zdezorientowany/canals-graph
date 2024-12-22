import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Plus, Eye, PencilSimple, Trash } from "@phosphor-icons/react";
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
                            <Button className="mx-1 mb-2">
                                <Plus />
                                Create
                            </Button>

                            {canals.length === 0 ? (
                                <Alert className="mb-4">
                                    <AlertTitle>No canals available</AlertTitle>
                                    There are no canals to display at the
                                    moment.
                                </Alert>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                ID
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Clients</TableHead>
                                            <TableHead className="w-[200px]">
                                                Actions
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
                                                <TableCell className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="mr-2"
                                                    >
                                                        <Eye
                                                            size={20}
                                                            className="mr-1"
                                                        />
                                                        Show
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="mr-2"
                                                    >
                                                        <PencilSimple
                                                            size={20}
                                                            className="mr-1"
                                                        />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                    >
                                                        <Trash
                                                            size={20}
                                                            className="mr-1"
                                                        />
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
        </AuthenticatedLayout>
    );
}
