import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Recharts = ({ data }) => {
  return (
    <BarChart
      width={1200}
      height={600}
      data={data.reverse()}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <ReferenceLine y={0} stroke="#000" />
      <Brush dataKey="date" height={30} stroke="#8884d8" />
      <Bar dataKey="totalPayload" fill="#82ca9d" />
    </BarChart>
  );
};

export default Recharts;
