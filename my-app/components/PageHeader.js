export default function PageHeader({ text, subtext }) {
  return (
    <header className="page-header p-4 p-md-5 mb-4 rounded-3">
      <h1 className="display-6 fw-bold mb-2">{text}</h1>
      {subtext && <p className="lead mb-0">{subtext}</p>}
    </header>
  );
}
