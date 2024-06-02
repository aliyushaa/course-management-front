import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {amber, teal} from '@mui/material/colors'
import {IUserTop} from "../types/auth.types";
import {topService} from "../services/score-top.service";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: amber,
    },
})

const UserTopPage: React.FC = () => {
    const [topUsers, setTopUsers] = useState<IUserTop[] | null>(null)

    useEffect(() => {
        async function fetchTop() {
            try {
                const users = await topService.getTop20()
                setTopUsers(users)
            } catch (e) {
                console.log(e)
            }
        }

        fetchTop()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className="mt-16 min-h-screen bg-gray-50 p-6 flex flex-col items-center">
                <Typography variant="h4" className="text-teal-600 font-bold">Top students</Typography>
                {topUsers &&
                    <div className="w-full max-w-3xl space-y-6 mt-6">
                        {topUsers!.map((topUser) => (
                            <Card key={topUser.user.id}
                                  className="hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                <CardContent>
                                    <Typography variant="h5" component="div" className="text-teal-800 font-semibold">
                                        {topUser.user.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" className="mt-1">
                                        Taken courses: {topUser.user.courseIds.length}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" className="mt-1">
                                        All time score: {topUser.allTimeScore}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                }
            </div>
        </ThemeProvider>
    )
}

export default UserTopPage
