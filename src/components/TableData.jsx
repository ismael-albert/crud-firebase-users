export default function TableData({ data, tableConfig }) {
  return (
    <table className="w-full text-center">
      <thead>
        <tr className="">
          {tableConfig.columns.map((item) => (
            <th key={item.key}>{item.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr className="w-full odd:bg-stone-100" key={item.id}>
            {tableConfig.columns.map((config) => (
              <td key={config.key}>
                {config.key == "action"
                  ? config.render(item)
                  : item[config.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
