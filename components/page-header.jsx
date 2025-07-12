export default function PageHeader({ title }) {
  return (
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  )
} 