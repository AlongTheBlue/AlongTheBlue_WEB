import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import BluesPlan from "../components/BluesPlan";

const AlongBluesPlan = () => {
    const { id } = useParams();

    return (
      <div className='page-container'>
        <PageHeader title={"바당따라"}/>
        <BluesPlan id={id}/>
        <Footer />
      </div>
    );
  };
  
  export default AlongBluesPlan;