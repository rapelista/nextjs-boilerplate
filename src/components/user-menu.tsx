'use client';

import { Avatar, Flex, Menu, Text, UnstyledButton } from '@mantine/core';
import { signOut } from 'next-auth/react';

export function UserMenu({ name }: { name?: string }) {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Flex align="center" gap="md" component={UnstyledButton}>
          <Avatar src={null} alt={name} name={name} color="blue" />
          <div>
            <Text fw="bold">{name}</Text>
            <Text fz="xs">{name}</Text>
          </div>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item color="red" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
