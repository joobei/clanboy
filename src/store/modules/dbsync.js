import { axios } from "axios";

async getMatches() {
        const response = await axios
        .get("http://localhost:5000/matches")
        .catch((err) => {console.log(err);
        });
    }