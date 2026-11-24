export default function Button({ children, type = "button", disabled = false, onClick }) {
  return (
    <button type={type} className="btn-gold btn-block" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}