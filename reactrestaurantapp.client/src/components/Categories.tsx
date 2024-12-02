import styled from 'styled-components'
import { Typography } from '@mui/material';
interface Category {
    id: number,
    categoryName: string
}
interface CategoriesProps {
    category:Category
}

const Categories: React.FC<CategoriesProps> = ({ category }) => {
    const CategoryCard = styled.div`
  width: 150px;
  height: 100px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #fff;
  background-color: #007bff;
  border-radius: 8px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background-color: #0056b3;
  }
`;


    const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px;
`;


    return (
        <CategoryContainer>

            <CategoryCard key={category.id}>
                <Typography>
                    {category.categoryName}
                </Typography>
            </CategoryCard>

        </CategoryContainer>
    );

}
export default Categories;
