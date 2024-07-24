export const usersTableColumn = [
  {
    header: "",
    accessor: "selection",
    type: "selection",
  },

  {
    header: "Name",
    accessor: "fullName",
    type: "string",
  },
  {
    header: "Role",
    accessor: "role",
    type: "badge",
  },

  {
    header: "Actions",
    accessor: "actions",
    type: "action",
    show: ["edit", "delete"],
  },
];

export const userTableRows = [
  {
    id: 1,
    fullName: "Pius Dike",
    role: "administrator",
  },
  {
    id: 2,
    fullName: "Pius Dike",
    role: "sales manager",
  },
  {
    id: 3,
    fullName: "Pius Dike",
    role: "administrator",
  },
  {
    id: 4,
    fullName: "Pius Dike",
    role: "sales representative",
  },
];


export function buildOverviewsTableData(datas) {
    return datas?.map((data) => {
      const newData = {
        ...data,
      };
  
      return newData;
    });
  }