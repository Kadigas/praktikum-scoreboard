async function TableLoader(){
    const response2 = await fetch("revisi/revisi.json");
    const revisiData = await response2.json();
    const table = document.createElement("table");
    const header = ["rank", "team", "score"];

    const tr = document.createElement("tr"); 

    header.forEach(element => { // table header
        const th = document.createElement("th");
        const text = document.createTextNode(element);
        th.appendChild(text);
        tr.appendChild(th);
    });

    revisiData.rows[0].problems.forEach(element => { // problem tag
        const th = document.createElement("th");
        const text = document.createTextNode(element.label);
        th.appendChild(text);
        tr.appendChild(th);
    });

    table.appendChild(tr);    

    revisiData.rows.forEach(element => {
        const tr = document.createElement("tr");

        const rank = document.createElement("td");
        const rankText = document.createTextNode(element.rank);
        rank.appendChild(rankText);
        tr.appendChild(rank);
        
        const team = document.createElement("td");
        const teamText = document.createTextNode(element.team_id);
        team.appendChild(teamText);
        tr.appendChild(team);

        const score = document.createElement("td");
        const scoreText = document.createElement("p");
        scoreText.classList.add("ScoreText");
        scoreText.appendChild(document.createTextNode(element.score.num_solved));
        score.appendChild(scoreText);
        const penaltyText = document.createElement("p");
        penaltyText.classList.add("PenaltyText");
        penaltyText.appendChild(document.createTextNode(element.score.total_time));
        score.appendChild(penaltyText);
        tr.appendChild(score);

        element.problems.forEach(prob => {
            const verdict = document.createElement("td");
            const timeText = document.createElement("p");
            const tryText = document.createElement("p");
            if(prob.num_judged !== 0 && prob.solved){
                verdict.classList.add("AC");
                timeText.classList.add("TimeText");
                timeText.appendChild(document.createTextNode(prob.time));
                verdict.appendChild(timeText);
                tryText.classList.add("TryText");
                tryText.appendChild(document.createTextNode(prob.num_judged + " try"));
                verdict.appendChild(tryText);
            }
            else if(prob.num_judged !== 0 && !prob.solved){
                verdict.classList.add("WA");
                timeText.classList.add("TimeText");
                timeText.appendChild(document.createTextNode("0"));
                verdict.appendChild(timeText);
                tryText.classList.add("TryText");
                tryText.appendChild(document.createTextNode(prob.num_judged + " try"));
                verdict.appendChild(tryText);
            }
            tr.appendChild(verdict);
        });

        table.appendChild(tr);

    });

    document.getElementById("tableContainer").appendChild(table);

}