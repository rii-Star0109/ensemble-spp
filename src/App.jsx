import { useState, useEffect } from 'react'
import './App.css'
import { useCards } from './hooks/useCards'

function App() {
    const {
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
    } = useCards();

    const [selectedAgency, setSelectedAgency] = useState(null)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [selectedMembers, setSelectedMembers] = useState([])
    const [selectedAttributes, setSelectedAttributes] = useState([])
    const [selectedRarity, setSelectedRarity] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    // 그룹이 로드되면 첫 번째 그룹 선택
    useEffect(() => {
        if (groups.length > 0 && !selectedGroup) {
            setSelectedGroup(groups[0])
        }
    }, [groups, selectedGroup])

    // 소속사 필터링된 그룹 목록
    const filteredGroups = getGroupsByAgency(selectedAgency)

    // 선택된 그룹의 멤버와 곡
    const groupMembers = selectedGroup ? getMembersByGroup(selectedGroup.id) : []
    const groupSongs = selectedGroup ? getSongsByGroup(selectedGroup.id) : []

    // 검색어로 곡 필터링
    const filteredSongs = groupSongs.filter(song =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // 로딩 중
    if (loading) {
        return (
            <div className="app">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '20px'
                }}>
                    데이터 로딩 중...
                </div>
            </div>
        )
    }

    // 에러 발생
    if (error) {
        return (
            <div className="app">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '18px',
                    color: 'red'
                }}>
                    에러 발생: {error}
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            <header className="header">
                <h1>앙상블 스타즈 SPP 카드 사전</h1>
            </header>

            <main className="main-content">
                <aside className="sidebar">
                    <div className="filter-section">
                        <h3>필터</h3>

                        <div className="filter-group">
                            <h4>소속사</h4>
                            <select
                                className="agency-select"
                                value={selectedAgency || ''}
                                onChange={(e) => {
                                    const agencyId = e.target.value || null
                                    setSelectedAgency(agencyId)
                                    const newGroups = getGroupsByAgency(agencyId)
                                    if (newGroups.length > 0) {
                                        setSelectedGroup(newGroups[0])
                                    }
                                }}
                            >
                                <option value="">전체</option>
                                {agencies.map(agency => (
                                    <option key={agency.id} value={agency.id}>
                                        {agency.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <h4>그룹</h4>
                            <select
                                className="group-select"
                                value={selectedGroup?.id || ''}
                                onChange={(e) => {
                                    const group = filteredGroups.find(g => g.id === e.target.value)
                                    setSelectedGroup(group)
                                }}
                            >
                                {filteredGroups.map(group => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <h4>곡 검색</h4>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="곡 제목 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="filter-group">
                            <h4>멤버</h4>
                            {groupMembers.map(member => (
                                <label key={member.id}>
                                    <input
                                        type="checkbox"
                                        checked={selectedMembers.includes(member.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedMembers([...selectedMembers, member.id])
                                            } else {
                                                setSelectedMembers(selectedMembers.filter(id => id !== member.id))
                                            }
                                        }}
                                    />
                                    {member.name}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>속성</h4>
                            {['Sparkle', 'Brilliant', 'Glitter', 'Flash'].map(attr => (
                                <label key={attr}>
                                    <input
                                        type="checkbox"
                                        checked={selectedAttributes.includes(attr)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedAttributes([...selectedAttributes, attr])
                                            } else {
                                                setSelectedAttributes(selectedAttributes.filter(a => a !== attr))
                                            }
                                        }}
                                    />
                                    {attr}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>레어도</h4>
                            {[4, 5].map(rarity => (
                                <label key={rarity}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRarity.includes(rarity)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRarity([...selectedRarity, rarity])
                                            } else {
                                                setSelectedRarity(selectedRarity.filter(r => r !== rarity))
                                            }
                                        }}
                                    />
                                    ★{rarity}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="content">
                    {selectedGroup && (
                        <>
                            <div className="group-title">
                                <h2>{selectedGroup.name}</h2>
                            </div>

                            <div className="table-container">
                                <table className="card-table">
                                    <thead>
                                    <tr>
                                        <th className="song-column">곡</th>
                                        {groupMembers.map(member => (
                                            <th key={member.id} style={{ backgroundColor: member.color }}>
                                                {member.name}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredSongs.length === 0 ? (
                                        <tr>
                                            <td colSpan={groupMembers.length + 1} style={{ textAlign: 'center', padding: '20px' }}>
                                                검색 결과가 없습니다
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredSongs.map(song => (
                                            <tr key={song.id}>
                                                <td className="song-name">{song.name}</td>
                                                {groupMembers.map(member => {
                                                    let memberCards = getCardsBySongAndMember(song.id, member.id)

                                                    // 멤버 필터 적용
                                                    if (selectedMembers.length > 0 && !selectedMembers.includes(member.id)) {
                                                        memberCards = []
                                                    }

                                                    // 속성 필터 적용
                                                    if (selectedAttributes.length > 0) {
                                                        memberCards = memberCards.filter(card =>
                                                            selectedAttributes.includes(card.attribute)
                                                        )
                                                    }

                                                    // 레어도 필터 적용
                                                    if (selectedRarity.length > 0) {
                                                        memberCards = memberCards.filter(card =>
                                                            selectedRarity.includes(card.rarity)
                                                        )
                                                    }

                                                    return (
                                                        <td key={member.id} className="card-cell">
                                                            <div className="card-images">
                                                                {memberCards.map((card) => (
                                                                    <img
                                                                        key={card.id}
                                                                        src={card.imageUrl}
                                                                        alt={`${member.name} - ${song.name}`}
                                                                        className={`card-img attribute-${card.attribute.toLowerCase()}`}
                                                                        title={`${card.attribute} ★${card.rarity}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    )
}

export default App