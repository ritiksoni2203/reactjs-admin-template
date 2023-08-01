// ** Third Party Components
import { Bar } from 'react-chartjs-2'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { goalsList } from '../../redux/goal/slice'
import CustomSpinner from '../../@core/components/customSpinner'
import '../../assets/scss/custom.scss'
import '../../@core/scss/base/themes/dark-layout.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { workoutsList } from '../../redux/workouts/slice'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];

export const data = {
    labels,
    datasets: [
        {
            data: [2, 32, 43, 3, 4, 34, 4, 5, 4, 53, 43, 43],
        }
    ],
};

const ProgressChart = ({ success, gridLineColor, labelColor }) => {
    const { data: goalData, status: goalStatus } = useSelector((store) => store.goal);
    const { data: workoutData, status: workoutStatus } = useSelector((store) => store.workout);
    const [selectedWorkoutType, setSelectedWorkoutType] = useState('');
    const dispatch = useDispatch();

    const goalOptions = useMemo(() => {
        // Extract unique goal types from goalData
        const uniquegoalTypes = Array.from(new Set(goalData.map((goal) => goal.workoutType)));
        return uniquegoalTypes;
    }, [goalData]);
    
    useEffect(() => {
        dispatch(goalsList());
        dispatch(workoutsList());
    }, [dispatch]);

    const handleChangeWorkoutType = (selectedType) => {
        setSelectedWorkoutType(selectedType);
    };

    const chartData = {
        labels: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        datasets: [
            {
                label: 'Dataset 1',
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    for (const goal of goalData) {
        const targetCaloriesPerWeek = goal.targetCaloriesPerWeek;
        const targetHoursPerWeek = goal.targetHoursPerWeek;
        const userId = goal.userId;

        const filteredWorkouts = workoutData.filter((workout) => workout.workoutType === selectedWorkoutType);

        for (const workout of filteredWorkouts) {
            const dayOfWeek = moment(workout.date).day();
            const completedCalories = workout.caloriesBurned;
            const completedHours = workout.duration;
            const caloriesProgress = (completedCalories / targetCaloriesPerWeek) * 100;
            const hoursProgress = (completedHours / targetHoursPerWeek) * 100;

            const progress = Math.round((caloriesProgress + hoursProgress) / 2);

            // Update the progress data for the corresponding day of the week
            chartData.datasets[0].data[dayOfWeek] += progress;
        }
    }

    const maxDataPoint = Math.max(...chartData.datasets[0].data);
    const yAxisMax = Math.ceil(maxDataPoint / 5) * 5;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        scales: {
            x: {
                grid: {
                    color: gridLineColor,
                    borderColor: gridLineColor
                },
                ticks: { color: labelColor }
            },
            y: {
                max: yAxisMax + 5,
                grid: {
                    color: gridLineColor,
                    borderColor: gridLineColor
                },
                ticks: {
                    stepSize: 5,
                    color: labelColor
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
    const placeholderOption = { label: 'Select Workout Type', value: '' };

    return (
        <>
            {status === 'loading' && <CustomSpinner />}
            <Card>
                <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                    <CardTitle tag='h4'>Yearly Introducer</CardTitle>
                    <div className="d-inline-block table-filter">
                        <Select
                            className="React"
                            classNamePrefix="select"
                            options={[placeholderOption, ...goalOptions.map((option) => ({ label: option, value: option }))]}
                            onChange={(selectedOption) => handleChangeWorkoutType(selectedOption.value)}
                            value={{ label: selectedWorkoutType || 'Select Workout Type', value: selectedWorkoutType }}
                        />
                    </div>
                </CardHeader>
                <CardBody>
                    <div style={{ height: '400px' }}>
                        <Bar options={options} data={chartData} />
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default ProgressChart