# ft_transcendence API

## login/out  

get log/in?intra_id={intra_id}  

    response: ({id:string | ""})  


// auth  
post log/in  

    body: {intra_id:string, password: string}  
    response: ({token:string})  


// logout  
patch log/out?intra_id={intra_id}  


## Lobby  

// 로비 모든 채팅방 리스트  
get Lobby/chatList  

    response: ({title:string, num(채팅방인원):number, security:string}[])  


// 로비 모든 게임 리스트  
get Lobby/gameList  

    response: ({p1:string, p2:string, speed:boolean, ladder:boolean}[])  


// 로비 내가 참여한 채팅방 리스트  
get Lobby/myChatList?id={id}  

    response: ({{title:string, num:number}[])  
    

// 로비 모든 유저 리스트  
get Lobby/userList?id={id} 

    response: ({id:string, icon:string, state:string, isFriend:boolean}[])  


//채팅방 입장하기  
post Lobby/enter  

    body ({title:string, id:nickname, password:string}) // 암호화된 비밀번호 argon2.hash 참조  

    return type :   
    - 401 unauthorization: 비밀번호 필요  
    - 403 forbiden: 차단된 멤버  
    - 404 not found: 없는 방입니다.  
    - 200 ok: 입장 성공.  


// myChat에서 채팅방 삭제하기  
delete Lobby?title={title}&id=id  


//채팅방 만들기  
// dm이 아닌경우, 'DM_a_b'과 같은 title이 생기지 않도록 db 예외처리 필요  
post Lobby/chatCreate  

    body ({title:string, password:string, security:string, owner_id:string}) // base64로 인코딩된 비밀번호  


// dm인 경우 title = 'DM_user1_user2'(ID오름차순 정렬), security:'private', pwd:'', owner_id:'user1'  
post lobby/dm  

    body ({user1:string, user2:string})  


//게임방만들기  
post Lobby/gameCreate  

    body({id:string, speed:boolean, ladder:boolean})  


## admin  

// 유저 자신의 프로필 id, icon 생성  
post admin  

    body: intra_id, icon, nickname  


patch admin  
    body: intra_id, icon, nickname  


## profile  

// 유저의 프로필 보기  
get profile?myID={nickname}&otherID={nickname}  

    return ({history:{win:boolean, id:string}[], friend:boolean, block:boolean, win:number , lose:number} - 남의프로필보는경우 | {history:{win:boolean, id}[], win:number, lose:number} - 내프로필보는경우)  


~~// 유저의 매칭요청  
get profile/:id/match ({id:string, result:boolean})~~  


// 해당 id의 친구 요청 (수락x,팔로잉o)  
put profile/friend   

    body: {myID, otherID, isFriend:boolean}  
    

// id에 대응하는 유저 블럭요청  
put profile/block   

    body: {myID, otherID, isBlock:boolean}  


## chat  

// 전체 채팅 로그 받기  
get chat/chatLog?title={title}  

    response: ({id, date, content, icon}[] | {sysMsg}[] : any[])  


// 채팅 로그 저장(메세지 한개씩 저장)   
post chat/chatLog  

    body: ({title, id, date, content})  


// 채팅방 정보  
get chat/info?title={title}  

    response: {num, security, users:{id:nickname, permission, icon}[]}  


// 비밀번호 변경(owner만)  
post chat/setting  

    body: {title:string, password:string}  

    return ({success:boolean})  
    
    
// (owner)가 관리자 지정  
get chat/admin?title={title}&id={nickname}  

    return ({success:boolean})  


// (owner)가 관리자 삭제  
delete chat/admin?title={title}&id={nickname}  

    return ({success:boolean})  


//kick:시간x ban:3일 mute:3일(owner + administrator)  
get chat/mute?title={title}&id={nickname}   

    return ({success:boolean})  


get chat/ban?title={title}&id={nickname}  

    return ({success:boolean})  


get chat/unban?title={title}&id={nickname}  

    return ({success:boolean})  


get chat/banList?title={title}  

    return ({id:string[]})  


get chat/kick?title={title}&id={nickname}  

    return ({success:boolean})  




## game  

server->client  
on.start (update + state) state = {left, right}  
on.finish (score 3:2)  
on.update (p1_pos, p1_dir, p2_pos, p2_dir, ball_pos, ball_dir, p1_score, p2_score, ball_speed)  


client->server  
on.up(true | false)  
on.down(true | fase)  
