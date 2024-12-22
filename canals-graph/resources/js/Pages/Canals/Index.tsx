import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

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
                            <pre className="p-4 bg-gray-200 rounded dark:bg-gray-700">
                                {JSON.stringify(canals, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
