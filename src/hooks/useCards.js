import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

export const useCards = () => {
    const [agencies, setAgencies] = useState([]);
    const [groups, setGroups] = useState([]);
    const [members, setMembers] = useState([]);
    const [songs, setSongs] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 소속사 가져오기
                const agenciesQuery = query(collection(db, 'agencies'), orderBy('order'));
                const agenciesSnapshot = await getDocs(agenciesQuery);
                const agenciesData = agenciesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAgencies(agenciesData);

                // 그룹 가져오기
                const groupsQuery = query(collection(db, 'groups'), orderBy('order'));
                const groupsSnapshot = await getDocs(groupsQuery);
                const groupsData = groupsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setGroups(groupsData);

                // 멤버 가져오기
                const membersQuery = query(collection(db, 'members'), orderBy('order'));
                const membersSnapshot = await getDocs(membersQuery);
                const membersData = membersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMembers(membersData);

                // 곡 가져오기
                const songsQuery = query(collection(db, 'songs'), orderBy('releaseDate', 'desc'));
                const songsSnapshot = await getDocs(songsQuery);
                const songsData = songsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSongs(songsData);

                // 카드 가져오기
                const cardsSnapshot = await getDocs(collection(db, 'cards'));
                const cardsData = cardsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCards(cardsData);

                setLoading(false);
            } catch (err) {
                console.error('데이터 로딩 실패:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 특정 그룹의 멤버 필터링
    const getMembersByGroup = (groupId) => {
        return members.filter(member => member.groupId === groupId);
    };

    // 특정 그룹의 곡 필터링
    const getSongsByGroup = (groupId) => {
        return songs.filter(song => song.groupId === groupId);
    };

    // 특정 곡과 멤버의 카드 필터링
    const getCardsBySongAndMember = (songId, memberId) => {
        return cards.filter(card =>
            card.songId === songId && card.memberId === memberId
        );
    };

    // 소속사별 그룹 필터링
    const getGroupsByAgency = (agencyId) => {
        if (!agencyId) return groups;
        return groups.filter(group => group.agencyId === agencyId);
    };

    return {
        agencies,
        groups,
        members,
        songs,
        cards,
        loading,
        error,
        getMembersByGroup,
        getSongsByGroup,
        getCardsBySongAndMember,
        getGroupsByAgency
    };
};