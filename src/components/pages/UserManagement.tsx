/* eslint-disable react-hooks/exhaustive-deps*/

import { memo, useCallback, useEffect, VFC } from "react"
import {
    Wrap, WrapItem, Spinner, Center, useDisclosure
} from "@chakra-ui/react"
import { UserCard } from "../orgamisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers"
import { useSelectUsers } from "../../hooks/useSelectUsers"
import { UserDetailModal } from "../orgamisms/user/UserDetailModal";
import { useLoginUser } from "../../hooks/userLoginUser";

export const UserManagement: VFC = memo(() => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { getUsers, loading, users } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUsers();
    const { loginUser } = useLoginUser();

    useEffect(() => {
        getUsers()
    }, [])

    const onClickUser = useCallback((id: number) => {
        onSelectUser({ id, users, onOpen })
    }, [users, onSelectUser, onOpen])

    return (
        <>
            {loading ? (
                <Center h="100vh">
                    <Spinner />
                </Center>
            ) : (
                <Wrap p={{ base: 4, md: 10 }} justify='center'>
                    {users?.map((user) => (
                        <WrapItem key={user.id} mx="auto">
                            <UserCard
                                id={user.id}
                                imageUrl="https://source.unsplash.com/random"
                                userName={user.username}
                                fullName={user.name}
                                onClick={onClickUser}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            )}
            <UserDetailModal isAdmin={loginUser?.isAdmin} isOpen={isOpen} onClose={onClose} user={selectedUser} />
        </>
    );
});