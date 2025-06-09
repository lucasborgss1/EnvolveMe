import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { name: "Físico", progresso: 80 },
    { name: "Mental", progresso: 65 },
    { name: "Espiritual", progresso: 50 },
];

export const ExampleChart = () => {
    return (
        <div style={{ width: "100%", height: 150 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="progresso" fill="#603fbd" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
