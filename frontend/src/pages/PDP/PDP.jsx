import { useParams } from 'react-router-dom';

const PDP = () => {
  const { productSlug } = useParams();

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product: {productSlug}</p>
    </div>
  );
};

export default PDP;
