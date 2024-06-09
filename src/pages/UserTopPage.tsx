import React, {useEffect, useState} from 'react'
import {createTheme} from '@mui/material/styles'
import {amber, teal} from '@mui/material/colors'
import {IUserTop} from "../types/auth.types";
import {topService} from "../services/score-top.service";
import styles from './UserTopPage.module.css';

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
        <div className={styles.container}>
            <div className={styles.topLeadersList}>
                {topUsers && topUsers.map((top, index) => (
                    <div className={styles.leader} key={top.user.id}>0
                        {index + 1 <= 3 && (
                            <div className={styles.containerImage}>
                                <img className={styles.image} loading="lazy" src="https://www.schoolbadgesuk.co.uk/cdn/shop/products/SBUK115-36c_1024x1024.jpg?v=1655284628" />
                                <div className={styles.crown}>
                                    <svg
                                        id="crown1"
                                        fill="#0f74b5"
                                        data-name="Layer 1"
                                        viewBox="0 0 100 50"
                                    >
                                        <polygon
                                            className="cls-1"
                                            points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50"
                                        />
                                    </svg>
                                </div>
                                <div className={styles.leaderName}>{top.user.name}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.playerslist}>
                <div className={styles.table}>
                    <div>#</div>
                    <div>Name of student</div>
                    <div>Taken courses</div>
                    <div>All time score</div>
                </div>
                <div className={styles.list}>
                    {topUsers && topUsers.map((top, index) => (
                        <div className={styles.player} key={top.user.id}>
                            <span> {index + 1}</span>
                            <div className={styles.user}>
                                <img className={styles.image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFYgpCPMtvHYo7rQ8fFSEgLa1BO78b_9hHA&s"/>
                                <span> {top.user.name} </span>
                            </div>
                            <span> {top.user.courseIds.length} </span>
                            <span> {top.allTimeScore} </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserTopPage
