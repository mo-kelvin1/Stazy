import { Platform, StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  FadeInView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  searchContainer: {
    marginTop: Platform.OS === 'android' ? 60 : 0,
    paddingBottom: 50,
  },
  searchBar: {
    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 32,
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 0.25,
    borderColor: '#DDDDDD',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    color: '#717171',
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#222222',
    backgroundColor: 'white',
  },
  tabWithBadge: {
    position: 'relative',
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#717171',
  },
  activeTabText: {
    color: '#22222',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  categoryContainer: {
    marginVertical: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222222',
  },
  horizontalList: {
    paddingLeft: 20,
  },
  propertyCard: {
    width: 170,
    marginRight: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: 170,
    height: 170,
    borderRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestFavoriteTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  guestFavoriteText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222222',
  },
  propertyInfo: {
    paddingTop: 12,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#222222',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    color: '#222222',
  },
  wishlistButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    backgroundColor: '#FF385C',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
