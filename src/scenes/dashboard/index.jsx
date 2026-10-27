import { useState, useEffect, useRef } from 'react';
import { Box, Typography, InputBase, IconButton, useTheme, Chip } from "@mui/material";
import { keyframes } from '@emotion/react';
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header from "../../components/Header";

// --- COMPONENTE TypingEffect ---
const TypingEffect = ({ fullText, typingSpeed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reseta o texto exibido sempre que o texto completo mudar
    setDisplayedText('');

    // Garante que só executa se houver texto para evitar erros
    if (fullText) {
      let i = 0;
      const intervalId = setInterval(() => {
        // Usa slice para pegar a porção correta do texto. É mais robusto.
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        // Para o intervalo quando o índice ultrapassa o comprimento do texto.
        if (i > fullText.length) {
          clearInterval(intervalId);
        }
      }, typingSpeed);

      // Função de limpeza para parar o intervalo se o componente for desmontado.
      return () => clearInterval(intervalId);
    }
  }, [fullText, typingSpeed]);

  const isTyping = displayedText.length < fullText.length;

  return (
    <Typography component="span" sx={{ whiteSpace: 'pre-wrap' }}>
      {displayedText}
      {isTyping && (<Box component="span" sx={{ animation: `${blink} 1s step-start infinite`, borderLeft: '2px solid', marginLeft: '2px' }}/>)}
    </Typography>
  );
};

const blink = keyframes`50% { border-color: transparent; }`;

const Dashboard = ({ messages: propMessages, setMessages, chatId, isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [localMessages, setLocalMessages] = useState([]);
  const messages = propMessages || localMessages;
  const updateMessages = setMessages || setLocalMessages;

  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;
  const pulseAnimation = keyframes`
    0% { box-shadow: 0 0 8px 0px ${colors.blueAccent[700]}; }
    50% { box-shadow: 0 0 16px 4px ${colors.blueAccent[500]}; }
    100% { box-shadow: 0 0 8px 0px ${colors.blueAccent[700]}; }
  `;

  // --- FUNÇÕES DE MANIPULAÇÃO  ---
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Arquivo selecionado:", file);
      setSelectedFile(file);
    }
    event.target.value = null;
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSendPrompt = () => {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt === "" && !selectedFile) return;

    let newMessages = [];
    if (trimmedPrompt) {
      console.log(`Enviando prompt de texto para o chat ID: ${chatId}`, { prompt: trimmedPrompt });
      newMessages.push({ id: Date.now(), text: trimmedPrompt, sender: 'user' });
    }
    if (selectedFile) {
      console.log(`Enviando arquivo ${selectedFile.name} junto com o prompt para o chat ID: ${chatId}`);
      newMessages.push({ id: Date.now() + 1, text: `Arquivo anexado: ${selectedFile.name}`, sender: 'user' });
    }
    if (newMessages.length > 0) {
      updateMessages(prev => [...prev, ...newMessages]);
    }

    setPrompt("");
    setSelectedFile(null);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 2,
        text: "Recebi sua mensagem. Em breve estarei conectada a uma inteligência artificial real!",
        sender: 'ai',
      };
      updateMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        m: isMobile ? "10px" : "20px",
        display: "flex",
        flexDirection: "column",
        height: isMobile ? "calc(100vh - 80px)" : "calc(100vh - 100px)"
      }}>
      <Header title="Sua IA" subtitle="Bem-vindo a nossa IA!" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flexGrow: 1,
          pb: 2,
          position: "relative"
        }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: messages.length === 0 ? "center" : "flex-start",
            alignItems: "center",
            overflowY: 'auto',
            p: 2
          }}>
          {messages.length === 0 ? (
            <Typography
              variant={isMobile ? "h2" : "h1"}
              sx={{
                textAlign: "center",
                fontSize: isMobile ? '32px' : '56px',
                fontWeight: 'bold',
                background: `linear-gradient(45deg, #FFD700, ${colors.blueAccent[500]}, #FFD700)`,
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: `${gradientAnimation} 4s ease infinite`
              }}>
              Pergunte a IA!
            </Typography>
          ) : (
            <Box
              sx={{
                width: "100%",
                maxWidth: "900px",
                display: "flex",
                flexDirection: "column",
                gap: 2
              }}>
              {messages.map(msg => (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    gap: isMobile ? 1 : 1.5,
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                  }}>
                  <Box sx={{
                    borderRadius: '50%',
                    backgroundColor: msg.sender === 'user' ? colors.blueAccent[800] : colors.greenAccent[800], // css aparencia do envio de prompt na tela
                    p: 1, display: 'flex', alignSelf: 'flex-start'
                  }}>
                    {msg.sender === 'user' ? <AccountCircleIcon /> : <SmartToyIcon />}
                  </Box>
                  <Box sx={{
                    backgroundColor: msg.sender === 'user' ? colors.blueAccent[700] : colors.primary[600],
                    color: colors.grey[100], 
                    p: '10px 15px', // css do retorno de mensagem pela IA 
                    borderRadius: '15px', 
                    maxWidth: '600px',
                  }}>
                    {msg.sender === 'ai' ? (
                      <TypingEffect fullText={msg.text} />
                    ) : (
                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
                    )}
                  </Box>
                </Box>
              ))}
              <div ref={endOfMessagesRef} />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2
          }}>
          {selectedFile && (
            <Box sx={{
              mb: 1
            }}>
              <Chip
                label={selectedFile.name}
                onDelete={handleRemoveFile}
                color="primary"
                sx={{ backgroundColor: colors.grey[700] }}
              />
            </Box>
          )}
          <Box
            sx={{
              width: { xs: '95%', sm: '90%', md: '80%' },
              maxWidth: "900px"
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                backgroundColor: colors.primary[700],
                borderRadius: '28px',
                border: `1px solid ${colors.grey[600]}`,
                transition: 'all 0.3s ease',

                '&:hover, &:focus-within': {
                  backgroundColor: colors.primary[400], borderColor: 'transparent',
                  boxShadow: `0 0 12px 2px ${colors.blueAccent[600]}`,
                },

                //animação da barra de input de prompt
                '&:focus-within': { animation: `${pulseAnimation} 2s infinite` }
              }}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
              <IconButton sx={{ color: colors.grey[100] }} onClick={handleIconClick}>
                <AddCircleOutlineIcon />
              </IconButton>
              <InputBase
                fullWidth placeholder="Peça a IA Interface" value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown ={handleKeyPress} multiline maxRows={5}
                sx={{
                  color: colors.grey[100], fontSize: '16px', ml: 1,
                  '& .MuiInputBase-input::placeholder': { color: colors.grey[300], opacity: 1 },
                }}
              />
              <IconButton
                onClick={handleSendPrompt}
                disabled={prompt.trim() === "" && !selectedFile}
                sx={{
                  color: colors.grey[100],
                  backgroundColor: (prompt.trim() === "" && !selectedFile) ? 'transparent' : colors.blueAccent[600],
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: (prompt.trim() === "" && !selectedFile) ? 'transparent' : colors.blueAccent[500],
                  }
                }}
              >
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
