import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";
import { canalSchema, CanalFormData } from "./partials/canalSchema";

interface EditProps extends InertiaProps {
    canal: {
        id: number;
        name: string;
        clients: number;
    };
}

export default function Edit() {
    const { canal } = usePage<EditProps>().props;

    const form = useForm<CanalFormData>({
        resolver: zodResolver(canalSchema),
        defaultValues: {
            name: canal.name,
            clients: canal.clients.toString(),
        },
    });

    const onSubmit = (data: CanalFormData) => {
        router.put(
            `/canals/${canal.id}`,
            { ...data, clients: Number(data.clients) },
            {
                onSuccess: () => form.reset(),
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="flex items-center justify-between text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <p className="flex items-center">
                        Canals: <span className="ml-2 text-gray-500">Edit</span>
                    </p>
                    <Button
                        variant="secondary"
                        onClick={() => router.visit("/canals")}
                    >
                        <ArrowLeft size={20} className="mr-1" />
                        Back
                    </Button>
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">
                                Edit Canal
                            </h2>

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="grid grid-cols-2 gap-6 mt-6"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Canal Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter canal name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="clients"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Number of Clients
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter number of clients"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end col-span-2">
                                        <Button type="submit">
                                            Update Canal
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
