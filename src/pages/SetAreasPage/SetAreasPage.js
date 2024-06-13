import { useState } from 'react';
import AreaForm from '../../components/Forms/AreaForm';
import Layout from '../../components/Layout/Layout';
import './SetAreasPage.css';
import AreasTable from '../../components/AreasTable/AreasTable';

const SetAreasPage = () => {
  const [areas, setAreas] = useState([]);

  return (
    <Layout>
      <div className='setArea-style'>
        <AreaForm areas={areas} setAreas={setAreas} />
        <AreasTable areas={areas} setAreas={setAreas} />
      </div>
    </Layout>
  );
};

export default SetAreasPage;