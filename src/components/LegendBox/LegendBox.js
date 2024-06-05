import './LegendBox.css';
import LegendItem from './LegendItem';
import LegendItem2 from './LegendItem2';

const LegendBox = ({legendItemSize}) => {
  //LA LEYENDA Y EL COLOR VA A VENIR CON EL NOMBRE DEL USUARIO
  return (
    <div className='ms-4 legend-style'>
      <LegendItem size={legendItemSize} bg={'bg-1'} homeOffice={false} halfDay={false} legend={'Día Normal'} /> 
      <LegendItem size={legendItemSize} bg={'bg-2'} homeOffice={true} halfDay={false} legend={'Home Office'} />
      <LegendItem size={legendItemSize} bg={'bg-7'} homeOffice={false} halfDay={true} legend={'Medio Día (opc. 1)'} />
      <LegendItem2 size={legendItemSize} bg={'bg-8'} homeOffice={false} halfDay={true} legend={'Medio Día (opc.2)'} />
      {/* <LegendItem size={legendItemSize} bg={'bg-3'} homeOffice={false} halfDay={false} legend={'Leyenda 5'} /> 
      <LegendItem size={legendItemSize} bg={'bg-4'} homeOffice={false} halfDay={false} legend={'Leyenda 6'} /> 
      <LegendItem size={legendItemSize} bg={'bg-5'} homeOffice={false} halfDay={false} legend={'Leyenda 7'} /> 
      <LegendItem size={legendItemSize} bg={'bg-6'} homeOffice={false} halfDay={false} legend={'Leyenda 8'} />  */}
    </div>
  );
};

export default LegendBox;