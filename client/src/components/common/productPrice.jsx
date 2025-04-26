export default function ProductPrice({ price, salePrice }) {
  return (
    <div className="flex justify-between items-center mb-2">
      <span
        className={`text-primary ${
          salePrice > 0
            ? 'line-through text-xl font-semibold'
            : 'font-bold text-3xl'
        }`}
      >
        ${price}
      </span>
      {salePrice > 0 && (
        <span className={`${salePrice > 0 ? 'text-3xl font-bold' : ''}`}>
          ${salePrice}
        </span>
      )}
    </div>
  );
}
