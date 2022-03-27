import { StatusProject } from '@common/Chip/StatusProject';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Project } from '@type/project';
import { FC } from 'react';
import Date from '@services/date';

export const CardProject: FC<{
  project: Project;
}> = ({ project: { avatar, name, status, updatedAt } }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component="img" sx={{ width: 151 }} image={avatar} alt="Live from space album cover" />
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {Date.toDateHoursStr(updatedAt)}
          </Typography>
          <StatusProject status={status as any} />
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
        </Box>
      </Box>
    </Card>
  );
};
