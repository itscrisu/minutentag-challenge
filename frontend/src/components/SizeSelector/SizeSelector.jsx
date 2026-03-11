import './SizeSelector.scss';

const SizeSelector = ({ skus, selectedSku, onSelect }) => {
  return (
    <div className="size-selector">
      {skus.map((sku) => (
        <button
          key={sku.code}
          className={`size-selector__pill ${selectedSku === sku.code ? 'size-selector__pill--active' : ''}`}
          onClick={() => onSelect(sku.code)}
          aria-label={`Select size ${sku.name}`}
          aria-pressed={selectedSku === sku.code}
          tabIndex={0}
        >
          {sku.name}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
