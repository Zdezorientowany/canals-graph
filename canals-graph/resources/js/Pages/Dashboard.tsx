import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelProps,
} from "recharts";

type Canal = {
    id: number;
    name: string;
    clients: number;
    percentage: number;
};

interface IndexProps extends InertiaProps {
    canals: Canal[];
}

interface DashboardLabelProps extends LabelProps {
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

export default function Dashboard() {
    const canals = usePage<IndexProps>().props.graphData;

    const pieData = canals.map((canal: Canal) => ({
        name: canal.name,
        value: canal.clients,
        percentage: canal.percentage,
    }));

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF",
        "#FF1919",
    ];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx = 50,
        cy = 50,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: DashboardLabelProps) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
        const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > Number(cx) ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <p className="m-4 text-xl font-semibold text-gray-500 ">
                            Graph Showing Percentage of Clients per Canal
                        </p>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="percentage"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={200}
                                    >
                                        {pieData.map(
                                            (entry: string, index: number) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}
                                    </Pie>
                                    <Tooltip
                                        content={({ payload }) => {
                                            if (payload && payload.length) {
                                                const { name, value } =
                                                    payload[0].payload;
                                                return (
                                                    <div className="p-2 bg-white rounded-lg">
                                                        <p className="text-sm font-semibold text-gray-500">
                                                            {name}
                                                        </p>
                                                        <p className="text-xs">
                                                            Clients: {value}
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="middle"
                                        layout="vertical"
                                        align="right"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
