const leaderboardHome = `
SELECT 
    t.team_name AS 'name',
    COUNT(m.home_team_id) AS totalGames,
    SUM(CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) AS totalPoints,
    SUM(CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 1
        ELSE 0
    END) AS totalVictories,
    SUM(CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) AS totalDraws,
    SUM(CASE
        WHEN m.home_team_goals < m.away_team_goals THEN 1
        ELSE 0
    END) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
    CAST((SUM(CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END) / (COUNT(m.home_team_id) * 3)) * 100
        AS DECIMAL (15 , 2 )) AS efficiency
FROM
    TRYBE_FUTEBOL_CLUBE.matches m
        INNER JOIN
    TRYBE_FUTEBOL_CLUBE.teams t ON m.home_team_id = t.id
WHERE
    m.in_progress = FALSE
GROUP BY m.home_team_id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

const leaderboardAway = `
SELECT 
    t.team_name AS 'name',
    COUNT(m.away_team_id) AS totalGames,
    SUM(CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END) AS totalPoints,
    SUM(CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 1
        ELSE 0
    END) AS totalVictories,
    SUM(CASE
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END) AS totalDraws,
    SUM(CASE
        WHEN m.away_team_goals < m.home_team_goals THEN 1
        ELSE 0
    END) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
    CAST((SUM(CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0
        END) / (COUNT(m.away_team_id) * 3)) * 100
        AS DECIMAL (15 , 2 )) AS efficiency
FROM
    TRYBE_FUTEBOL_CLUBE.matches m
        INNER JOIN
    TRYBE_FUTEBOL_CLUBE.teams t ON m.away_team_id = t.id
WHERE
    m.in_progress = FALSE
GROUP BY m.away_team_id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

const leaderboardHome2 = `
SELECT 
    t.team_name AS 'name',
    COUNT(m.home_team_id) AS totalGames,
    SUM(CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) AS totalPoints,
    SUM(CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 1
        ELSE 0
    END) AS totalVictories,
    SUM(CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) AS totalDraws,
    SUM(CASE
        WHEN m.home_team_goals < m.away_team_goals THEN 1
        ELSE 0
    END) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance
FROM
    TRYBE_FUTEBOL_CLUBE.matches m
        INNER JOIN
    TRYBE_FUTEBOL_CLUBE.teams t ON m.home_team_id = t.id
WHERE
    m.in_progress = FALSE
GROUP BY m.home_team_id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

const leaderboardAway2 = `
SELECT 
    t.team_name AS 'name',
    COUNT(m.away_team_id) AS totalGames,
    SUM(CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END) AS totalPoints,
    SUM(CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 1
        ELSE 0
    END) AS totalVictories,
    SUM(CASE
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END) AS totalDraws,
    SUM(CASE
        WHEN m.away_team_goals < m.home_team_goals THEN 1
        ELSE 0
    END) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
    CAST((SUM(CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0
        END) / (COUNT(m.away_team_id) * 3)) * 100
        AS DECIMAL (15 , 2 )) AS efficiency
FROM
    TRYBE_FUTEBOL_CLUBE.matches m
        INNER JOIN
    TRYBE_FUTEBOL_CLUBE.teams t ON m.away_team_id = t.id
WHERE
    m.in_progress = FALSE
GROUP BY m.away_team_id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

export { leaderboardHome, leaderboardAway, leaderboardHome2, leaderboardAway2 };
