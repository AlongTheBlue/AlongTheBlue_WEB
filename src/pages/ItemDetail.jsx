import "../styles/Page.css";
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ItemDetailCard from '../components/ItemDetailCard';

function ItemDetail() {
    const { category, id } = useParams();

    return (
        <div className="detail-page-container">
            {/* <Header /> */}
            <ItemDetailCard category={category} id={id}/>
            <Footer/>
        </div>
    );
}

export default ItemDetail;