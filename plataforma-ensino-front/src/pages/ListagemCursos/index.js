import { STORAGE_URL } from "../../variables";
import { useState, useEffect } from "react";
import { Show } from "../../actions/SnackbarActions";
import { useNavigate } from "react-router-dom";
import {Get} from '../../utils/request';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch } from "react-redux";

const ListagemCursos = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courses, SetCourses] = useState([]);
  const [loading, SetLoading] = useState(false);

  const [page, SetPage] = useState(1);
  const [maxPage, SetMaxPage] = useState(1);
  const [search, setSearch] = useState('');

  const GetData = async () => {
    SetLoading(true);
    let response = await Get(`courses-main?search=${search}&page=${page}`);
    SetLoading(false);

    if (response?.status === true) {
      SetCourses(response?.courses);
      SetMaxPage(response?.pagination.last_page);
    } else if (!response) dispatch(Show({
      show: true,
      message: "Falha ao carregar os cursos",
      severity: "warning"
    }));
    console.log(response.courses);
  }

  useEffect(() => {
    GetData();
  }, [search, page]);


  return (
    <main style={{ minHeight: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: "20px", backgroundColor: "#212121", color: '#e1e1e1'}}>
      <h2>Usuário logado no front</h2>
      <br />
      <h3>Cursos listados aki</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {courses.map((curso, index) => (
          <Card
            onClick={()=> {navigate(`home/curso/${curso.id}`)}}
            key={index}
            raised={true}
            sx={{ 
              width: "30%", 
              margin: "1.5%", 
              backgroundColor: "#2e2e2e",              
             }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={STORAGE_URL + curso.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#f7f7f7', fontWeight: 'bold' }}>
                  {curso.name}
                </Typography>
                <Typography variant="body2"  sx={{ color: '#e1e1e1' }}>
                  {curso.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>


    </main>
  )
}
export default ListagemCursos