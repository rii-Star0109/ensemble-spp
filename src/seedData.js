// src/seedData.js
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from './services/firebase';

const seedData = async () => {
    try {
        console.log('데이터 입력 시작...');

        // 1. Agencies
        const agencies = [
            { id: 'agency_001', name: 'STARMAKER PRODUCTION', order: 1 },
            { id: 'agency_002', name: 'COSMIC PRODUCTION', order: 2 }
            { id: 'agency_003', name: 'RHYTHM LINK', order: 3 }
            { id: 'agency_004', name: 'NEW DIMENSION', order: 4 }
            { id: 'agency_005', name: 'SHUFFLE', order: 5 }
            { id: 'agency_006', name: 'etc', order: 6 }
        ];

        for (const agency of agencies) {
            await setDoc(doc(db, 'agencies', agency.id), {
                name: agency.name,
                order: agency.order
            });
            console.log(`✅ Agency: ${agency.name}`);
        }

        // 2. Groups
        const groups = [
            { id: 'group_001', name: 'fine', agencyId: 'agency_001', order: 1 },
            { id: 'group_002', name: 'Trickstar', agencyId: 'agency_001', order: 2 },
            { id: 'group_003', name: '유성대', agencyId: 'agency_001', order: 3 },
            { id: 'group_004', name: 'ALKALOID', agencyId: 'agency_001', order: 4 },
            { id: 'group_005', name: 'Eden', agencyId: 'agency_002', order: 5 },
            { id: 'group_006', name: 'Valkyrie', agencyId: 'agency_002', order: 6 },
            { id: 'group_007', name: '2wink', agencyId: 'agency_002', order: 7 },
            { id: 'group_008', name: 'Crazy:B', agencyId: 'agency_002', order: 8 },
            { id: 'group_009', name: 'UNDEAD', agencyId: 'agency_003', order: 9 },
            { id: 'group_010', name: 'Rabits', agencyId: 'agency_003', order: 10 },
            { id: 'group_011', name: '홍월', agencyId: 'agency_003', order: 11 },
            { id: 'group_012', name: 'Knights', agencyId: 'agency_004', order: 12 },
            { id: 'group_013', name: 'Switch', agencyId: 'agency_004', order: 13 },
            { id: 'group_014', name: 'MaM', agencyId: 'agency_004', order: 14 },
            { id: 'group_015', name: 'Special for Princess', agencyId: 'agency_004', order: 15 },
            { id: 'group_016', name: 'Double Face', agencyId: 'agency_004', order: 16 },
            { id: 'group_017', name: '데이트 플랜 A to Z', agencyId: 'agency_005', order: 17 },
            { id: 'group_018', name: 'Midnight Butlers', agencyId: 'agency_005', order: 18 },
            { id: 'group_019', name: 'Sweet Sweet White Song', agencyId: 'agency_005', order: 19 },
            { id: 'group_020', name: 'Aisle, be with you', agencyId: 'agency_005', order: 20 },
            { id: 'group_021', name: '문라이트 디스코', agencyId: 'agency_005', order: 21 },
            { id: 'group_022', name: 'Noir Neige', agencyId: 'agency_005', order: 22 },
            { id: 'group_023', name: '패러다임・리버시!', agencyId: 'agency_005', order: 23 },
            { id: 'group_024', name: 'FIST OF SOUL', agencyId: 'agency_005', order: 24 },
            { id: 'group_025', name: 'Heart aid Cafeteria', agencyId: 'agency_005', order: 25 },
            { id: 'group_026', name: 'Have you been naughty or nice?', agencyId: 'agency_005', order: 26 },
            { id: 'group_027', name: 'Ringing evil phone', agencyId: 'agency_005', order: 27 },
            { id: 'group_028', name: '우의 상실 -LOST BALLADE-', agencyId: 'agency_005', order: 28 },
            { id: 'group_029', name: '타천사들의 만찬회', agencyId: 'agency_005', order: 29 },
            { id: 'group_030', name: 'BRAND NEW STARS!!', agencyId: 'agency_006', order: 30 },
            { id: 'group_031', name: 'Walk with your smile', agencyId: 'agency_006', order: 31 },
            { id: 'group_032', name: 'FUSIONIC STARS!!', agencyId: 'agency_006', order: 32 },
            { id: 'group_033', name: 'Surprising Thanks!!', agencyId: 'agency_006', order: 33 },
            { id: 'group_034', name: 'LIMIT BREAK DREAMERS', agencyId: 'agency_006', order: 34 },
            { id: 'group_035', name: '선풍에 휘날려', agencyId: 'agency_006', order: 35 },
            { id: 'group_036', name: 'Eccentric Party Night!!', agencyId: 'agency_006', order: 36 },
            { id: 'group_037', name: 'Genuine Revelation', agencyId: 'agency_006', order: 37 },
            { id: 'group_038', name: 'Death Game Holic', agencyId: 'agency_006', order: 38 },
            { id: 'group_039', name: 'Crush of Judgment', agencyId: 'agency_006', order: 39 },
            { id: 'group_040', name: 'Twilight Pentagram', agencyId: 'agency_006', order: 40 },
            { id: 'group_041', name: 'Dawning Angels', agencyId: 'agency_006', order: 41 },
            { id: 'group_042', name: 'ROCK ROAR', agencyId: 'agency_006', order: 42 },
            { id: 'group_043', name: 'We`ll be "Knights"', agencyId: 'agency_006', order: 43 },
            { id: 'group_044', name: 'Fusion', agencyId: 'agency_006', order: 44 }
        ];

        for (const group of groups) {
            await setDoc(doc(db, 'groups', group.id), {
                name: group.name,
                agencyId: group.agencyId,
                order: group.order
            });
            console.log(`✅ Group: ${group.name}`);
        }

        // 3. Members
        const members = [
            // fine
            { id: 'member_001', name: '텐쇼인 에이치', groupId: 'group_001', order: 1 },
            { id: 'member_002', name: '히비키 와타루', groupId: 'group_001', order: 2 },
            { id: 'member_003', name: '히메미야 토리', groupId: 'group_001', order: 3 },
            { id: 'member_004', name: '후시미 유즈루', groupId: 'group_001', order: 4 },

            // Trickstar
            { id: 'member_005', name: '히다카 호쿠토', groupId: 'group_002', order: 1 },
            { id: 'member_006', name: '아케호시 스바루', groupId: 'group_002', order: 2 },
            { id: 'member_007', name: '유우키 마코토', groupId: 'group_002', order: 3 },
            { id: 'member_008', name: '이사라 마오', groupId: 'group_002', order: 4 },

            { id: 'member_008', name: '나구모 테토라', groupId: 'group_003', order: 4 },
            { id: 'member_008', name: '타카미네 미도리', groupId: 'group_003', order: 4 },
            { id: 'member_008', name: '센고쿠 시노부', groupId: 'group_003', order: 4 },
            { id: 'member_008', name: '모리사와 치아키', groupId: 'group_003', order: 4 },
            { id: 'member_008', name: '신카이 카나타', groupId: 'group_003', order: 4 },

            { id: 'member_008', name: '아마기 히이로', groupId: 'group_004', order: 4 },
            { id: 'member_008', name: '시라토리 아이라', groupId: 'group_004', order: 4 },
            { id: 'member_008', name: '아야세 마요이', groupId: 'group_004', order: 4 },
            { id: 'member_008', name: '카제하야 타츠미', groupId: 'group_004', order: 4 },

            { id: 'member_008', name: '란 나기사', groupId: 'group_005', order: 4 },
            { id: 'member_008', name: '토모에 히요리', groupId: 'group_005', order: 4 },
            { id: 'member_008', name: '사에구사 이바라', groupId: 'group_005', order: 4 },
            { id: 'member_008', name: '사자나미 쥰', groupId: 'group_005', order: 4 },

            { id: 'member_008', name: '이츠키 슈', groupId: 'group_006', order: 4 },
            { id: 'member_008', name: '카게히라 미카', groupId: 'group_006', order: 4 },

            { id: 'member_008', name: '아오이 히나타', groupId: 'group_007', order: 4 },
            { id: 'member_008', name: '아오이 유우타', groupId: 'group_007', order: 4 },

            { id: 'member_008', name: '아마기 린네', groupId: 'group_008', order: 4 },
            { id: 'member_008', name: 'HiMERU', groupId: 'group_008', order: 4 },
            { id: 'member_008', name: '오우카와 코하쿠', groupId: 'group_008', order: 4 },
            { id: 'member_008', name: '시이나 니키', groupId: 'group_008', order: 4 },

            { id: 'member_008', name: '사쿠마 레이', groupId: 'group_009', order: 4 },
            { id: 'member_008', name: '하카제 카오루', groupId: 'group_009', order: 4 },
            { id: 'member_008', name: '오오가미 코가', groupId: 'group_009', order: 4 },
            { id: 'member_008', name: '오토가리 아도니스', groupId: 'group_009', order: 4 },

            { id: 'member_008', name: '마시로 토모야', groupId: 'group_010', order: 4 },
            { id: 'member_008', name: '니토 나즈나', groupId: 'group_010', order: 4 },
            { id: 'member_008', name: '텐마 미츠루', groupId: 'group_010', order: 4 },
            { id: 'member_008', name: '시노 하지메', groupId: 'group_010', order: 4 },

            { id: 'member_008', name: '하스미 케이토', groupId: 'group_011', order: 4 },
            { id: 'member_008', name: '키류 쿠로', groupId: 'group_011', order: 4 },
            { id: 'member_008', name: '칸자키 소마', groupId: 'group_011', order: 4 },
            { id: 'member_008', name: '타키 이부키', groupId: 'group_011', order: 4 },

            { id: 'member_008', name: '스오우 츠카사', groupId: 'group_012', order: 4 },
            { id: 'member_008', name: '츠키나가 레오', groupId: 'group_012', order: 4 },
            { id: 'member_008', name: '세나 이즈미', groupId: 'group_012', order: 4 },
            { id: 'member_008', name: '사쿠마 리츠', groupId: 'group_012', order: 4 },
            { id: 'member_008', name: '나루카미 아라시', groupId: 'group_012', order: 4 },

            { id: 'member_008', name: '사카사키 나츠메', groupId: 'group_013', order: 4 },
            { id: 'member_008', name: '아오바 츠무기', groupId: 'group_013', order: 4 },
            { id: 'member_008', name: '하루카와 소라', groupId: 'group_013', order: 4 },

            { id: 'member_008', name: '미케지마 마다라', groupId: 'group_014', order: 4 },

            { id: 'member_008', name: '사기리 에스', groupId: 'group_015`', order: 4 },
            { id: 'member_008', name: '나츠 칸나', groupId: 'group_015`', order: 4 },
            { id: 'member_008', name: '하나무라 후유메', groupId: 'group_015`', order: 4 },
            { id: 'member_008', name: '호죠 라이카', groupId: 'group_015`', order: 4 },

            { id: 'member_008', name: '미케지마 마다라', groupId: 'group_016', order: 4 },
            { id: 'member_008', name: '오우카와 코하쿠', groupId: 'group_016', order: 4 },

            { id: 'member_008', name: '하카제 카오루', groupId: 'group_017', order: 4 },
            { id: 'member_008', name: '모리사와 치아키', groupId: 'group_017', order: 4 },
            { id: 'member_008', name: '텐마 미츠루', groupId: 'group_017', order: 4 },
            { id: 'member_008', name: '사카사키 나츠메', groupId: 'group_017', order: 4 },
            { id: 'member_008', name: '시이나 니키', groupId: 'group_017', order: 4 },

            { id: 'member_008', name: '세나 이즈미', groupId: 'group_018', order: 4 },
            { id: 'member_008', name: '세나 이즈미', groupId: 'group_018', order: 4 },







        ];

        for (const member of members) {
            await setDoc(doc(db, 'members', member.id), {
                name: member.name,
                groupId: member.groupId,
                color: member.color,
                order: member.order
            });
            console.log(`✅ Member: ${member.name}`);
        }

        // 4. Songs
        const songs = [
            { id: 'song_001', name: '終わらないシンフォニア', groupId: 'group_001', releaseDate: new Date('2024-01-01') },
            { id: 'song_002', name: "Holy Angel's Carol", groupId: 'group_001', releaseDate: new Date('2024-02-01') },
            { id: 'song_003', name: '羽ばたきのフォルティシモ', groupId: 'group_001', releaseDate: new Date('2024-03-01') },

            { id: 'song_004', name: 'Rebellion Star', groupId: 'group_002', releaseDate: new Date('2024-01-15') },
            { id: 'song_005', name: 'トリックスター', groupId: 'group_002', releaseDate: new Date('2024-02-15') }
        ];

        for (const song of songs) {
            await setDoc(doc(db, 'songs', song.id), {
                name: song.name,
                groupId: song.groupId,
                releaseDate: song.releaseDate
            });
            console.log(`✅ Song: ${song.name}`);
        }

        // 5. Cards (샘플 카드들)
        const cards = [
            // song_001 - member_001
            { songId: 'song_001', memberId: 'member_001', attribute: 'Sparkle', rarity: 5, imageUrl: 'https://via.placeholder.com/150/FF6B9D/FFFFFF?text=Sparkle' },
            { songId: 'song_001', memberId: 'member_001', attribute: 'Brilliant', rarity: 5, imageUrl: 'https://via.placeholder.com/150/2196F3/FFFFFF?text=Brilliant' },

            // song_001 - member_002
            { songId: 'song_001', memberId: 'member_002', attribute: 'Glitter', rarity: 5, imageUrl: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=Glitter' },
            { songId: 'song_001', memberId: 'member_002', attribute: 'Flash', rarity: 5, imageUrl: 'https://via.placeholder.com/150/9C27B0/FFFFFF?text=Flash' },

            // song_001 - member_003
            { songId: 'song_001', memberId: 'member_003', attribute: 'Sparkle', rarity: 5, imageUrl: 'https://via.placeholder.com/150/FF6B9D/FFFFFF?text=Sparkle' },
            { songId: 'song_001', memberId: 'member_003', attribute: 'Brilliant', rarity: 4, imageUrl: 'https://via.placeholder.com/150/2196F3/FFFFFF?text=Brilliant' },

            // song_001 - member_004
            { songId: 'song_001', memberId: 'member_004', attribute: 'Flash', rarity: 5, imageUrl: 'https://via.placeholder.com/150/9C27B0/FFFFFF?text=Flash' },
            { songId: 'song_001', memberId: 'member_004', attribute: 'Glitter', rarity: 5, imageUrl: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=Glitter' }
        ];

        for (const card of cards) {
            await addDoc(collection(db, 'cards'), {
                ...card,
                createdAt: new Date()
            });
        }
        console.log(`✅ ${cards.length}개 카드 추가 완료`);

        console.log('🎉 모든 데이터 입력 완료!');
    } catch (error) {
        console.error('❌ 에러 발생:', error);
    }
};

export default seedData;