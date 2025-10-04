import { useState } from 'react'
import './App.css'

// 임시 데이터
const mockData = {
    agencies: [
        { id: 1, name: '앙상블 스퀘어' }, // 앙상블 스퀘어
        { id: 2, name: '스타메이커 프로덕션' }, // 스타메이커 프로덕션
        { id: 3, name: '코즈믹 프로덕션' } // 코즈믹 프로덕션
    ],
    groups: [
        {
            id: 1,
            name: 'Fine',
            agencyId: 1,
            members: [
                { id: 1, name: '벤쇼인 에이치', color: '#FFE0B2' },
                { id: 2, name: '허버키 와타루', color: '#B3E5FC' },
                { id: 3, name: '히메미야 토리', color: '#F8BBD0' },
                { id: 4, name: '유치미 요츠무', color: '#E1BEE7' }
            ],
            songs: [
                { id: 1, name: '곤나지 앉는 심포니아' },
                { id: 2, name: 'Holy Angel\'s Carol' },
                { id: 3, name: '남겨진 포르티시모' }
            ]
        },
        {
            id: 2,
            name: 'Trickstar',
            agencyId: 2,
            members: [
                { id: 5, name: '히다카 호쿠토', color: '#FFE0B2' },
                { id: 6, name: '유키 마코토', color: '#B3E5FC' }
            ],
            songs: [
                { id: 4, name: 'テスト曲1' },
                { id: 5, name: 'テスト曲2' }
            ]
        }
    ],
    cards: [
        { songId: 1, memberId: 1, imageUrl: 'https://via.placeholder.com/100', attribute: 'Brilliant', rarity: 5 },
        { songId: 1, memberId: 1, imageUrl: 'https://via.placeholder.com/100', attribute: 'Sparkle', rarity: 5 },
        { songId: 1, memberId: 2, imageUrl: 'https://via.placeholder.com/100', attribute: 'Glitter', rarity: 5 },
        { songId: 1, memberId: 2, imageUrl: 'https://via.placeholder.com/100', attribute: 'Flash', rarity: 5 },
        { songId: 1, memberId: 3, imageUrl: 'https://via.placeholder.com/100', attribute: 'Sparkle', rarity: 5 },
        { songId: 1, memberId: 3, imageUrl: 'https://via.placeholder.com/100', attribute: 'Brilliant', rarity: 5 },
        { songId: 1, memberId: 4, imageUrl: 'https://via.placeholder.com/100', attribute: 'Flash', rarity: 5 },
        { songId: 1, memberId: 4, imageUrl: 'https://via.placeholder.com/100', attribute: 'Glitter', rarity: 5 },
    ]
}

function App() {
    const [selectedAgency, setSelectedAgency] = useState(null) // null = 전체
    const [selectedGroup, setSelectedGroup] = useState(mockData.groups[0])
    const [selectedMembers, setSelectedMembers] = useState([])
    const [selectedAttributes, setSelectedAttributes] = useState([])
    const [selectedRarity, setSelectedRarity] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    // 소속사 필터링된 그룹 목록
    const filteredGroups = selectedAgency
        ? mockData.groups.filter(g => g.agencyId === selectedAgency)
        : mockData.groups

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
                                    const agencyId = e.target.value ? parseInt(e.target.value) : null
                                    setSelectedAgency(agencyId)
                                    // 소속사 변경시 첫 번째 그룹으로 자동 선택
                                    const newGroups = agencyId
                                        ? mockData.groups.filter(g => g.agencyId === agencyId)
                                        : mockData.groups
                                    if (newGroups.length > 0) {
                                        setSelectedGroup(newGroups[0])
                                    }
                                }}
                            >
                                <option value="">전체</option>
                                {mockData.agencies.map(agency => (
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
                                value={selectedGroup.id}
                                onChange={(e) => {
                                    const group = filteredGroups.find(g => g.id === parseInt(e.target.value))
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
                            {selectedGroup.members.map(member => (
                                <label key={member.id}>
                                    <input type="checkbox" />
                                    {member.name}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>속성</h4>
                            <label><input type="checkbox" /> Sparkle</label>
                            <label><input type="checkbox" /> Brilliant</label>
                            <label><input type="checkbox" /> Glitter</label>
                            <label><input type="checkbox" /> Flash</label>
                        </div>

                        <div className="filter-group">
                            <h4>레어도</h4>
                            <label><input type="checkbox" /> ★4</label>
                            <label><input type="checkbox" /> ★5</label>
                        </div>
                    </div>
                </aside>

                <section className="content">
                    <div className="group-title">
                        <h2>{selectedGroup.name}</h2>
                    </div>

                    <div className="table-container">
                        <table className="card-table">
                            <thead>
                            <tr>
                                <th className="song-column">곡</th>
                                {selectedGroup.members.map(member => (
                                    <th key={member.id} style={{ backgroundColor: member.color }}>
                                        {member.name}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {selectedGroup.songs.map(song => (
                                <tr key={song.id}>
                                    <td className="song-name">{song.name}</td>
                                    {selectedGroup.members.map(member => {
                                        const cards = mockData.cards.filter(
                                            card => card.songId === song.id && card.memberId === member.id
                                        )
                                        return (
                                            <td key={member.id} className="card-cell">
                                                <div className="card-images">
                                                    {cards.map((card, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={card.imageUrl}
                                                            alt="카드"
                                                            className={`card-img attribute-${card.attribute.toLowerCase()}`}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App