import express from 'express'
import 'dotenv/config'
//create app variable to refer to express functionality
export const app = express();



//"Cross Origin Resource Sharing" - changes security configurations which allows the server to load resources from an origin other than its own
import cors from 'cors'
app.use(cors())


app.use(express.static("client"));

//setting the port where server will run
const PORT = process.env.PORT || 3000




//setting the route for the request
app.get('/movies', async (req, res) => { //targeting the movies param of the url
    try {
        const searchQuery = req.query.q // pulling the query segment of the url and storing it
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`; //add query to url
        const options = {  //customizing the configuration of the http request
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }
        const response = await fetch(url, options); //waiting for the promised response to be resolved and then storing it
        const data = await response.json(); //parses JSON
        res.json(data); //sends json data to the client/ makes it available
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
})

const router = express.Router() //setting up a route on the same server for similar movies in addition to the route for search by title

router.get('/movie/:movieId', async (req, res) => { //"movieId" is the name given for the id that will go in that spot
    try {
        const Id = req.params.movieId
        const url = `https://api.themoviedb.org/3/movie/${Id}`

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }

        }
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data)
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
})

app.use(router)

//creating a server instance and listening for requests
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`)
})


