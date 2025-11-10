import React from "react";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { Spinner, Button, Table, TableHeader, TableRow, TableBody, TableCell, TableColumn } from "@heroui/react";

import { DefaultLayout } from "@components";

export function Home() {
  return (
    <DefaultLayout>
      <div className="space-y-4">
        <p className="text-2xl font-bold text-center">
          React + Vite + TailwindCSS + HeroUI
        </p>
        <MockUsers />
      </div>
    </DefaultLayout>
  );
}

function MockUsers() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("https://jsonplaceholder.typicode.com/users").then((res) => res.data),
  });

  const [ users, setUsers ] = React.useState<any[]>([]);

  const refresh = () => {
    refetch().then(() => {
      if (data) {
        setUsers([...data].sort(() => Math.random() - 0.5));
      }
    });
  };

  React.useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  if (isError) return (
    <div className="w-full h-fullflex flex-col justify-center items-center">
      <p className="text-red-500">{error.message}</p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-start space-y-4">
      <Table 
        aria-label="Mock Users"
        classNames={{
          table: "min-h-[400px] min-w-[600px]",
        }}
      >
        <TableHeader>
          <TableColumn> No. </TableColumn>
          <TableColumn> Id </TableColumn>
          <TableColumn> Name </TableColumn>
          <TableColumn> Username </TableColumn>
          <TableColumn> Email </TableColumn>
          <TableColumn> Phone </TableColumn>
          <TableColumn> Website </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {users.map((user: any, i: number) => (
            <TableRow key={user.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onPress={refresh} color="primary" size="md" className="self-end">
        Refresh
      </Button>
    </div>
  );
}