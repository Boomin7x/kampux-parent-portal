import {
    AttachFile as AttachIcon,
    Message as ComposeIcon,
    Message as MessageIcon,
    School as SchoolIcon,
    Search as SearchIcon,
    Send as SendIcon,
    Person as TeacherIcon,
    Circle as UnreadIcon,
} from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import type { Student } from '../../../../types/student.types';

interface MessageCenterProps {
    selectedStudent: Student | null;
    className?: string;
}

interface Message {
    id: string;
    fromId: string;
    fromName: string;
    fromRole: 'teacher' | 'parent' | 'admin';
    fromAvatar?: string;
    toId: string;
    toName: string;
    subject: string;
    content: string;
    timestamp: string;
    isRead: boolean;
    hasAttachment: boolean;
    priority: 'low' | 'medium' | 'high';
    threadId: string;
    replyToId?: string;
    studentId?: string;
    studentName?: string;
    classId?: string;
    className?: string;
}

interface MessageThread {
    id: string;
    subject: string;
    participants: string[];
    lastMessage: Message;
    messageCount: number;
    unreadCount: number;
    studentId?: string;
    studentName?: string;
    classId?: string;
    className?: string;
}

// Mock message data
const mockMessages: Message[] = [
    {
        id: 'msg1',
        fromId: 'teacher1',
        fromName: 'Ms. Rodriguez',
        fromRole: 'teacher',
        toId: 'parent1',
        toName: 'Sarah Johnson',
        subject: 'Math Quiz Performance',
        content:
            "Hi Ms. Johnson, I wanted to discuss Emma's recent quiz performance in Mathematics. She seems to be struggling with quadratic equations. Could we schedule a brief call to discuss some strategies to help her improve?",
        timestamp: '2024-01-18T10:30:00Z',
        isRead: false,
        hasAttachment: false,
        priority: 'medium',
        threadId: 'thread1',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        classId: 'class1',
        className: 'Advanced Mathematics',
    },
    {
        id: 'msg2',
        fromId: 'parent1',
        fromName: 'Sarah Johnson',
        fromRole: 'parent',
        toId: 'teacher1',
        toName: 'Ms. Rodriguez',
        subject: 'Re: Math Quiz Performance',
        content:
            "Thank you for reaching out, Ms. Rodriguez. I've noticed Emma has been having some difficulty with homework lately. I'd appreciate any additional practice materials you might recommend. When would be a good time to talk?",
        timestamp: '2024-01-18T14:15:00Z',
        isRead: true,
        hasAttachment: false,
        priority: 'medium',
        threadId: 'thread1',
        replyToId: 'msg1',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        classId: 'class1',
        className: 'Advanced Mathematics',
    },
    {
        id: 'msg3',
        fromId: 'teacher2',
        fromName: 'Mr. Thompson',
        fromRole: 'teacher',
        toId: 'parent1',
        toName: 'Sarah Johnson',
        subject: 'Excellent Lab Work!',
        content:
            "I wanted to share some great news about Emma's recent lab work in Biology. Her analysis of the photosynthesis experiment was outstanding and showed excellent critical thinking skills. Keep up the great work!",
        timestamp: '2024-01-17T16:45:00Z',
        isRead: false,
        hasAttachment: true,
        priority: 'low',
        threadId: 'thread2',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        classId: 'class2',
        className: 'AP Biology',
    },
    {
        id: 'msg4',
        fromId: 'admin1',
        fromName: 'Principal Martinez',
        fromRole: 'admin',
        toId: 'parent1',
        toName: 'Sarah Johnson',
        subject: 'Parent-Teacher Conference Reminder',
        content:
            "This is a reminder that your scheduled parent-teacher conference is tomorrow, January 19th at 2:00 PM. Please bring any questions you may have about Emma's progress this quarter.",
        timestamp: '2024-01-17T09:00:00Z',
        isRead: true,
        hasAttachment: false,
        priority: 'high',
        threadId: 'thread3',
        studentId: 'student1',
        studentName: 'Emma Johnson',
    },
];

export const MessageCenter: React.FC<MessageCenterProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedThread, setSelectedThread] = useState<MessageThread | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const [composeOpen, setComposeOpen] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    // Group messages into threads
    const messageThreads = useMemo(() => {
        const threadMap = new Map<string, Message[]>();

        mockMessages.forEach(message => {
            if (!threadMap.has(message.threadId)) {
                threadMap.set(message.threadId, []);
            }
            threadMap.get(message.threadId)!.push(message);
        });

        const threads: MessageThread[] = Array.from(threadMap.entries()).map(
            ([threadId, messages]) => {
                const sortedMessages = messages.sort(
                    (a, b) =>
                        new Date(b.timestamp).getTime() -
                        new Date(a.timestamp).getTime()
                );
                const lastMessage = sortedMessages[0];
                const unreadCount = messages.filter(
                    msg => !msg.isRead && msg.fromRole !== 'parent'
                ).length;

                return {
                    id: threadId,
                    subject: messages[0].subject.replace(/^Re: /, ''),
                    participants: [
                        ...new Set(
                            messages.flatMap(msg => [msg.fromName, msg.toName])
                        ),
                    ],
                    lastMessage,
                    messageCount: messages.length,
                    unreadCount,
                    studentId: lastMessage.studentId,
                    studentName: lastMessage.studentName,
                    classId: lastMessage.classId,
                    className: lastMessage.className,
                };
            }
        );

        return threads.sort(
            (a, b) =>
                new Date(b.lastMessage.timestamp).getTime() -
                new Date(a.lastMessage.timestamp).getTime()
        );
    }, []);

    const filteredThreads = useMemo(() => {
        let filtered = messageThreads;

        // Filter by student if selected
        if (selectedStudent) {
            filtered = filtered.filter(
                thread => thread.studentId === selectedStudent.id
            );
        }

        // Filter by tab
        switch (activeTab) {
            case 0: // All
                break;
            case 1: // Unread
                filtered = filtered.filter(thread => thread.unreadCount > 0);
                break;
            case 2: // From Teachers
                filtered = filtered.filter(
                    thread => thread.lastMessage.fromRole === 'teacher'
                );
                break;
            case 3: // From School
                filtered = filtered.filter(
                    thread => thread.lastMessage.fromRole === 'admin'
                );
                break;
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                thread =>
                    thread.subject
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    thread.lastMessage.content
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    thread.participants.some(p =>
                        p.toLowerCase().includes(searchTerm.toLowerCase())
                    )
            );
        }

        return filtered;
    }, [messageThreads, activeTab, searchTerm, selectedStudent]);

    const getTabCounts = () => {
        const unread = messageThreads.filter(
            thread => thread.unreadCount > 0
        ).length;
        const fromTeachers = messageThreads.filter(
            thread => thread.lastMessage.fromRole === 'teacher'
        ).length;
        const fromSchool = messageThreads.filter(
            thread => thread.lastMessage.fromRole === 'admin'
        ).length;

        return { unread, fromTeachers, fromSchool };
    };

    const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
        switch (priority) {
            case 'high':
                return 'error';
            case 'medium':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getRoleIcon = (role: 'teacher' | 'parent' | 'admin') => {
        switch (role) {
            case 'teacher':
                return <TeacherIcon />;
            case 'admin':
                return <SchoolIcon />;
            default:
                return <MessageIcon />;
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        return date.toLocaleDateString();
    };

    const handleThreadClick = (thread: MessageThread) => {
        setSelectedThread(thread);
        setDialogOpen(true);
        // Mark as read
        // In a real app, this would trigger an API call
    };

    const handleReply = () => {
        if (replyContent.trim() && selectedThread) {
            // In a real app, this would send the message via API
            console.log('Sending reply:', replyContent);
            setReplyContent('');
        }
    };

    const tabCounts = getTabCounts();

    if (!selectedStudent) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <MessageIcon
                            sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
                        />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to view messages
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box className={className}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Message Center
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<ComposeIcon />}
                    onClick={() => setComposeOpen(true)}
                    sx={{ textTransform: 'none' }}
                >
                    New Message
                </Button>
            </Box>

            <Card>
                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                        },
                    }}
                >
                    <Tab
                        label={
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                All Messages
                                <Chip
                                    label={messageThreads.length}
                                    size="small"
                                    sx={{ fontSize: '0.6875rem' }}
                                />
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                Unread
                                <Badge
                                    badgeContent={tabCounts.unread}
                                    color="error"
                                >
                                    <Box />
                                </Badge>
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                From Teachers
                                <Chip
                                    label={tabCounts.fromTeachers}
                                    size="small"
                                    sx={{ fontSize: '0.6875rem' }}
                                />
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                From School
                                <Chip
                                    label={tabCounts.fromSchool}
                                    size="small"
                                    sx={{ fontSize: '0.6875rem' }}
                                />
                            </Box>
                        }
                    />
                </Tabs>

                <CardContent>
                    {/* Search */}
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 3 }}
                    />

                    {/* Message Threads */}
                    <List sx={{ p: 0 }}>
                        {filteredThreads.map((thread, index) => (
                            <React.Fragment key={thread.id}>
                                <ListItem
                                    button
                                    onClick={() => handleThreadClick(thread)}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 1,
                                        backgroundColor:
                                            thread.unreadCount > 0
                                                ? alpha(
                                                      theme.palette.primary
                                                          .main,
                                                      0.05
                                                  )
                                                : 'transparent',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.08
                                            ),
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Badge
                                            badgeContent={thread.unreadCount}
                                            color="error"
                                            overlap="circular"
                                        >
                                            <Avatar
                                                src={
                                                    thread.lastMessage
                                                        .fromAvatar
                                                }
                                                sx={{
                                                    backgroundColor:
                                                        thread.lastMessage
                                                            .fromRole ===
                                                        'teacher'
                                                            ? 'primary.main'
                                                            : thread.lastMessage
                                                                    .fromRole ===
                                                                'admin'
                                                              ? 'secondary.main'
                                                              : 'grey.500',
                                                }}
                                            >
                                                {getRoleIcon(
                                                    thread.lastMessage.fromRole
                                                )}
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {thread.unreadCount > 0 && (
                                                    <UnreadIcon
                                                        sx={{
                                                            fontSize: 8,
                                                            color: 'primary.main',
                                                        }}
                                                    />
                                                )}
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight:
                                                            thread.unreadCount >
                                                            0
                                                                ? 600
                                                                : 400,
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {thread.subject}
                                                </Typography>
                                                {thread.lastMessage.priority ===
                                                    'high' && (
                                                    <Chip
                                                        label="High"
                                                        size="small"
                                                        color="error"
                                                        sx={{
                                                            fontSize:
                                                                '0.6875rem',
                                                        }}
                                                    />
                                                )}
                                                {thread.lastMessage
                                                    .hasAttachment && (
                                                    <AttachIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: 'text.secondary',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient:
                                                            'vertical',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {thread.lastMessage.content}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            thread.lastMessage
                                                                .fromName
                                                        }{' '}
                                                        •{' '}
                                                        {formatTimestamp(
                                                            thread.lastMessage
                                                                .timestamp
                                                        )}
                                                    </Typography>
                                                    {thread.className && (
                                                        <Chip
                                                            label={
                                                                thread.className
                                                            }
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{
                                                                fontSize:
                                                                    '0.6875rem',
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < filteredThreads.length - 1 && (
                                    <Divider />
                                )}
                            </React.Fragment>
                        ))}
                    </List>

                    {filteredThreads.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <MessageIcon
                                sx={{
                                    fontSize: 48,
                                    color: 'text.disabled',
                                    mb: 2,
                                }}
                            />
                            <Typography variant="body1" color="text.secondary">
                                No messages found
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Message Thread Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { height: '80vh' },
                }}
            >
                <DialogTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h6">
                            {selectedThread?.subject}
                        </Typography>
                        {selectedThread?.className && (
                            <Chip
                                label={selectedThread.className}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}
                    </Box>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 0 }}>
                    {selectedThread && (
                        <List sx={{ p: 0 }}>
                            {mockMessages
                                .filter(
                                    msg => msg.threadId === selectedThread.id
                                )
                                .sort(
                                    (a, b) =>
                                        new Date(a.timestamp).getTime() -
                                        new Date(b.timestamp).getTime()
                                )
                                .map((message, index, messages) => (
                                    <React.Fragment key={message.id}>
                                        <ListItem
                                            sx={{
                                                alignItems: 'flex-start',
                                                p: 3,
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={message.fromAvatar}
                                                    sx={{
                                                        backgroundColor:
                                                            message.fromRole ===
                                                            'teacher'
                                                                ? 'primary.main'
                                                                : message.fromRole ===
                                                                    'admin'
                                                                  ? 'secondary.main'
                                                                  : 'grey.500',
                                                    }}
                                                >
                                                    {getRoleIcon(
                                                        message.fromRole
                                                    )}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 2,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {message.fromName}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {new Date(
                                                                message.timestamp
                                                            ).toLocaleString()}
                                                        </Typography>
                                                        {message.hasAttachment && (
                                                            <Chip
                                                                label="Attachment"
                                                                size="small"
                                                                icon={
                                                                    <AttachIcon />
                                                                }
                                                                sx={{
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            whiteSpace:
                                                                'pre-wrap',
                                                            lineHeight: 1.6,
                                                        }}
                                                    >
                                                        {message.content}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        {index < messages.length - 1 && (
                                            <Divider />
                                        )}
                                    </React.Fragment>
                                ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Type your reply..."
                            value={replyContent}
                            onChange={e => setReplyContent(e.target.value)}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <IconButton color="primary">
                                <AttachIcon />
                            </IconButton>
                            <Button
                                variant="contained"
                                onClick={handleReply}
                                disabled={!replyContent.trim()}
                                startIcon={<SendIcon />}
                                sx={{ textTransform: 'none' }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                </DialogActions>
            </Dialog>

            {/* Compose Message Dialog */}
            <Dialog
                open={composeOpen}
                onClose={() => setComposeOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogContent>
                    {/* Compose form would go here */}
                    <Typography color="text.secondary">
                        Compose message functionality coming soon...
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setComposeOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained">Send</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
